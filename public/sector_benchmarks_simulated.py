"""
Sector Benchmarks — Simulated Data
Same visualisations as sector_benchmarks.ipynb but with fully generated data.
Real sector names replaced by Sector A–Q. Amounts approximate the real dataset.
"""

import matplotlib
matplotlib.use('Agg')  # non-interactive backend — saves to files instead of opening windows
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.ticker as mticker
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch
import seaborn as sns
import numpy as np
from matplotlib.colors import LinearSegmentedColormap

sns.set_theme(style='whitegrid', font_scale=1.05)
plt.rcParams['figure.figsize'] = (14, 6)
plt.rcParams['figure.dpi'] = 120
plt.rcParams['font.family'] = 'sans-serif'

C = {
    'primary':   '#0000D2',
    'secondary': '#365FD9',
    'accent':    '#747474',
    'dark':      '#242424',
    'light_grey':'#F4F4F4',
    'mid_grey':  '#747474',
    'warning':   '#C3D1CE',
    'reliable':  '#0000D2',
    'caution':   '#365FD9',
    'unreliable':'#747474',
}

io_cmap = LinearSegmentedColormap.from_list('io_blue', ['#F4F4F4', '#C3D1CE', '#365FD9', '#0000D2'])

OUT_DIR = 'simulated_charts'
import os; os.makedirs(OUT_DIR, exist_ok=True)
_chart_idx = [0]
def save_chart(name):
    _chart_idx[0] += 1
    path = f'{OUT_DIR}/{_chart_idx[0]:02d}_{name}.png'
    plt.tight_layout()
    plt.savefig(path, dpi=120, bbox_inches='tight')
    plt.close()
    print(f'  Saved: {path}')

rng = np.random.default_rng(42)

# ─── Sector definitions ───────────────────────────────────────────────────────
SECTORS = [f'Sector {chr(65+i)}' for i in range(17)]  # Sector A … Sector Q

ACCOUNTS = [34, 75, 62, 18, 22, 45, 58, 50, 28, 42, 15, 38, 31, 24, 12, 42, 9]
# Total = 605

# Sessions roughly proportional to accounts with some noise
SESSION_BASE = np.array([3.5, 62, 38, 4.2, 8.1, 18, 55, 22, 7.3, 11, 3.8, 14, 9.5, 6.2, 2.9, 15, 1.7]) * 1e6
SESSION_BASE = SESSION_BASE * (323e6 / SESSION_BASE.sum())  # rescale to exactly 323 M

ENGAGEMENT   = rng.uniform(48, 78, 17)
BOUNCE       = rng.uniform(30, 65, 17)
PROPERTIES   = [a + rng.integers(0, a // 3 + 1) for a in ACCOUNTS]

df_kpi = pd.DataFrame({
    'sector':           SECTORS,
    'accounts':         ACCOUNTS,
    'properties':       PROPERTIES,
    'sessions':         SESSION_BASE.astype(int),
    'engaged_sessions': (SESSION_BASE * ENGAGEMENT / 100).astype(int),
    'avg_bounce':       BOUNCE,
})
df_kpi['sessions_per_account'] = df_kpi['sessions'] / df_kpi['accounts']
df_kpi['eng_rate'] = ENGAGEMENT

# ─── 1. Dataset KPI Header ────────────────────────────────────────────────────
fig, axes = plt.subplots(1, 5, figsize=(16, 3))
kpis = [
    (f'{sum(ACCOUNTS)}',   'Accounts'),
    (f'{sum(PROPERTIES)}', 'Properties'),
    (f'{len(SECTORS)}',    'Sectors'),
    (f'{int(SESSION_BASE.sum()/1e6):.0f}M', 'Sessions'),
    ('Jan 2026\nApr 2026', 'Date Range'),
]
for ax, (value, label) in zip(axes, kpis):
    ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis('off')
    ax.text(0.5, 0.6, value,  ha='center', va='center', fontsize=22, fontweight='bold', color=C['primary'])
    ax.text(0.5, 0.2, label,  ha='center', va='center', fontsize=11, color=C['dark'])
    ax.add_patch(FancyBboxPatch((0.05, 0.05), 0.9, 0.9, boxstyle='round,pad=0.05',
                                facecolor=C['light_grey'], edgecolor=C['mid_grey'], linewidth=0.5))
fig.suptitle('Dataset KPIs', fontweight='bold', fontsize=20, y=1.05)
save_chart("chart")

# ─── 2. Accounts per Sector ───────────────────────────────────────────────────
def reliability_color(n):
    if n >= 20: return C['reliable']
    if n >= 10: return C['caution']
    return C['unreliable']

df_port = df_kpi.sort_values('accounts', ascending=False).reset_index(drop=True)
colors  = [reliability_color(n) for n in df_port['accounts']]

fig, ax = plt.subplots(figsize=(14, 8))
ax.barh(range(len(df_port)), df_port['accounts'], color=colors, alpha=0.85)
ax.set_yticks(range(len(df_port))); ax.set_yticklabels(df_port['sector']); ax.invert_yaxis()
ax.set_xlabel('Accounts (organisations)')
ax.set_title('Accounts per Sector', fontweight='bold', fontsize=20)
ax.axvline(x=20, color=C['reliable'], linewidth=0.8, linestyle='--', alpha=0.4)
ax.axvline(x=10, color=C['caution'],  linewidth=0.8, linestyle='--', alpha=0.4)

save_chart("chart")

# ─── 3. Sector Concentration ──────────────────────────────────────────────────
top1_shares = rng.uniform(10, 70, 17)
top3_shares = np.minimum(top1_shares + rng.uniform(10, 35, 17), 100)
conc_order  = np.argsort(SESSION_BASE)

fig, ax = plt.subplots(figsize=(14, 9))
y  = range(17)
ys = [SECTORS[i] for i in conc_order]
props_n = [PROPERTIES[i] for i in conc_order]

ax.barh(y, [top3_shares[i] for i in conc_order], color=C['secondary'], label='Top 3 properties', alpha=0.7)
ax.barh(y, [top1_shares[i] for i in conc_order], color=C['primary'],   label='Top 1 property')
ax.set_yticks(y)
ax.set_yticklabels([f'{s} (n={n})' for s, n in zip(ys, props_n)], fontsize=10)
ax.set_xlabel('Share of sector sessions (%)'); ax.set_xlim(0, 105)
ax.axvline(50, color=C['dark'], linestyle='--', alpha=0.4, linewidth=1)
ax.set_title('Sector Concentration', fontsize=20, fontweight='bold', pad=15)
ax.legend(loc='upper left', fontsize=11, framealpha=0.9); ax.grid(axis='x', alpha=0.3)
save_chart("chart")

# ─── 4. Traffic Channel DNA ───────────────────────────────────────────────────
channel_names  = ['Direct', 'Organic Search', 'Paid', 'Social', 'Other']
channel_colors = {'Direct': '#0000D2', 'Organic Search': '#C3D1CE', 'Paid': '#365FD9',
                  'Social': '#DCCFC2', 'Other': '#747474'}

raw_mix = rng.dirichlet(alpha=[3, 3, 2, 1.5, 1], size=17)  # shape (17, 5)
mix_pct = pd.DataFrame(raw_mix * 100, index=SECTORS, columns=channel_names)
mix_pct = mix_pct.sort_values('Direct', ascending=True)

fig, ax = plt.subplots(figsize=(14, 9))
mix_pct[channel_names].plot(kind='barh', stacked=True, ax=ax,
    color=[channel_colors[c] for c in channel_names],
    edgecolor='white', linewidth=0.3)
ax.set_xlabel('% of total sessions')
ax.set_title('Traffic Channel DNA per Sector', fontweight='bold', fontsize=20)
ax.axvline(x=50, color='black', linewidth=0.3, linestyle='--', alpha=0.2)
ax.legend(loc='upper center', bbox_to_anchor=(0.5, -0.04), ncol=5, frameon=False, fontsize=10)
ax.set_xlim(0, 100)
save_chart("chart")

# ─── 5. Device Split per Sector ───────────────────────────────────────────────
raw_dev = rng.dirichlet(alpha=[2, 3, 0.5], size=17)  # Desktop, Mobile, Tablet
dev_pct = pd.DataFrame(raw_dev * 100, index=SECTORS, columns=['Desktop', 'Mobile', 'Tablet'])
dev_pct = dev_pct.sort_values('Mobile', ascending=True)

fig, ax = plt.subplots(figsize=(14, 8))
dev_pct[['Desktop', 'Mobile', 'Tablet']].plot(
    kind='barh', stacked=True, ax=ax,
    color=['#0000D2', '#365FD9', '#C3D1CE'], edgecolor='white', linewidth=0.3)
ax.axvline(x=50, color='black', linewidth=1.0, linestyle='--', alpha=0.4)
ax.set_xlabel('% sessions')
ax.set_title('Device Split per Sector', fontweight='bold', fontsize=20)
ax.set_xlim(0, 100)
ax.legend(loc='upper center', bbox_to_anchor=(0.5, -0.05), ncol=3, frameon=False)

for i, (sector, row) in enumerate(dev_pct.iterrows()):
    mobile = row['Mobile']
    desktop = row['Desktop']
    if mobile > 8:
        ax.text(desktop + mobile / 2, i, f'{mobile:.0f}%',
                va='center', ha='center', fontsize=8, fontweight='bold', color='white')
save_chart("chart")

# ─── 6. Weekend Activity Drop-off ────────────────────────────────────────────
weekend_diff = rng.uniform(-63, 8, 17)
weekend_diff = np.sort(weekend_diff)  # ascending for chart
weekday_avg  = (SESSION_BASE / 85).astype(int)  # ~85 weekdays in Jan-Apr
weekend_avg  = (weekday_avg * (1 + weekend_diff / 100)).astype(int)

wk_df = pd.DataFrame({
    'sector':       SECTORS,
    'weekend_diff': weekend_diff,
    'weekday_daily': weekday_avg,
    'weekend_daily': weekend_avg,
})
wk_df = wk_df.sort_values('weekend_diff', ascending=True).reset_index(drop=True)
df_abs = wk_df.sort_values('weekday_daily', ascending=True).tail(10)

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(17, 8))

bar_colors = [C['primary'] if d > -20 else C['secondary'] if d > -40 else C['mid_grey']
              for d in wk_df['weekend_diff']]
bars = ax1.barh(range(len(wk_df)), wk_df['weekend_diff'], color=bar_colors, alpha=0.85)
ax1.set_yticks(range(len(wk_df))); ax1.set_yticklabels(wk_df['sector'])
ax1.axvline(x=0, color=C['dark'], linewidth=1.2)
ax1.set_xlabel('← Less weekend activity    |    More weekend activity →')
ax1.set_title('Weekend Activity Drop-off', fontweight='bold', fontsize=20)
ax1.grid(axis='x', alpha=0.2)
for bar, row in zip(bars, wk_df.itertuples()):
    val = row.weekend_diff
    ha = 'left' if val >= 0 else 'right'
    ax1.text(val + (1 if val >= 0 else -1), bar.get_y() + bar.get_height() / 2,
             f'{val:+.0f}%', va='center', ha=ha, fontsize=9, color=C['dark'])

y_pos = range(len(df_abs))
ax2.barh(y_pos, df_abs['weekday_daily'] / 1000, height=0.4,
         color=C['primary'], alpha=0.7, label='Weekday avg (K/day)')
ax2.barh([y + 0.4 for y in y_pos], df_abs['weekend_daily'] / 1000, height=0.4,
         color=C['secondary'], alpha=0.7, label='Weekend avg (K/day)')
ax2.set_yticks([y + 0.2 for y in y_pos]); ax2.set_yticklabels(df_abs['sector'])
ax2.set_xlabel('Average sessions per day (thousands)')
ax2.set_title('Absolute Daily Volume (top 10)', fontweight='bold', fontsize=20)
ax2.legend(loc='lower right')
save_chart("chart")

# ─── 7. Conversion Rate by Channel × Sector ──────────────────────────────────
conv_channels = ['Direct', 'Email', 'Organic Search', 'Paid Search', 'Paid Social/Display', 'Referral']
cvr_matrix    = rng.uniform(0, 40, (17, 6))
cvr_matrix[:, 1] = rng.uniform(15, 60, 17)   # Email typically high
cvr_matrix[:, 4] = rng.uniform(5,  25, 17)   # Paid Social typically lower

pivot_cvr = pd.DataFrame(cvr_matrix, index=SECTORS, columns=conv_channels)
pivot_cvr = pivot_cvr.loc[pivot_cvr.mean(axis=1).sort_values(ascending=False).index]

tracking_pct = rng.integers(20, 90, 17)
coverage_map = dict(zip(SECTORS, tracking_pct))

fig, ax = plt.subplots(figsize=(14, 10))
sns.heatmap(pivot_cvr, annot=True, fmt='.1f', cmap=io_cmap, ax=ax,
            linewidths=0.5, linecolor='white', vmin=0, vmax=100,
            cbar_kws={'label': 'Conversion Rate (%)', 'shrink': 0.8})

ylabels = [f'{s}  ({int(coverage_map.get(s, 0))}% tracks)' for s in pivot_cvr.index]
ax.set_yticklabels(ylabels, rotation=0)
ax.set_title('Conversion Rate by Channel × Sector', fontweight='bold', fontsize=20)
ax.set_xlabel(''); ax.set_ylabel('')
save_chart("chart")

# ─── 8. Deep-Dive: Sector A (34 accounts, ~68 properties) ────────────────────
DEEP_SECTOR  = 'Sector A'
N_PROPS      = 68
prop_sessions = rng.integers(500, 180_000, N_PROPS).astype(float)
prop_sessions[0] = 850_000   # one dominant whale
prop_sessions[1] = 420_000

prop_eng    = rng.uniform(40, 88, N_PROPS)
prop_cvr    = rng.uniform(0, 35, N_PROPS)
prop_dur    = rng.uniform(45, 280, N_PROPS)
prop_new_pct= rng.uniform(25, 85, N_PROPS)
prop_accounts = [f'Account {i+1:02d}' for i in range(N_PROPS)]

ch_mix_props = rng.dirichlet(alpha=[3, 3, 2, 1.5, 1], size=N_PROPS) * 100
df_props = pd.DataFrame({
    'property_id':   range(N_PROPS),
    'account_name':  prop_accounts,
    'sessions':      prop_sessions.astype(int),
    'engaged_sessions': (prop_sessions * prop_eng / 100).astype(int),
    'eng_rate':      prop_eng,
    'cvr':           prop_cvr,
    'avg_duration':  prop_dur,
    'new_user_pct':  prop_new_pct,
})
for i, ch in enumerate(channel_names):
    df_props[ch] = ch_mix_props[:, i]

df_props['eng_quartile'] = pd.qcut(df_props['eng_rate'], 4,
                                    labels=['Q4 (bottom)', 'Q3', 'Q2', 'Q1 (top)'])

# 8a. Account Leaderboard
df_acc = df_props.groupby('account_name').agg(
    sessions=('sessions', 'sum'),
    engaged_sessions=('engaged_sessions', 'sum'),
    properties=('property_id', 'count')
).reset_index()
df_acc['eng_rate'] = df_acc['engaged_sessions'] / df_acc['sessions'] * 100
df_acc = df_acc.sort_values('sessions', ascending=False).reset_index(drop=True)

TOP_N    = 15
df_top   = df_acc.head(TOP_N).sort_values('sessions', ascending=True).reset_index(drop=True)
df_rest  = df_acc.iloc[TOP_N:]

fig, ax = plt.subplots(figsize=(14, 8))
ax.barh(range(len(df_top)), df_top['sessions'], color=C['primary'], alpha=0.8, edgecolor='white', linewidth=0.3)
ax.set_yticks(range(len(df_top))); ax.set_yticklabels(df_top['account_name'], fontsize=9)
ax.set_xscale('log')
ax.xaxis.set_major_formatter(mticker.FuncFormatter(
    lambda x, _: f'{x/1e3:.0f}K' if x < 1e6 else f'{x/1e6:.1f}M'))
ax.set_title(f'Account Leaderboard: {DEEP_SECTOR}', fontweight='bold', fontsize=20)
ax.grid(axis='x', alpha=0.3)
for i, row in enumerate(df_top.itertuples()):
    ax.text(row.sessions * 1.1, i, f'{row.eng_rate:.0f}% eng', va='center', fontsize=8, color=C['dark'])
save_chart("chart")
print(f'\nLong tail: {len(df_rest)} accounts with {df_rest["sessions"].sum()/1e3:.0f}K sessions combined')

# 8b. Property Positioning
MIN_SESSIONS = 1000
df_pos = df_props[df_props['sessions'] >= MIN_SESSIONS].copy()
df_pos['eng_quartile'] = pd.qcut(df_pos['eng_rate'], 4, labels=['Q4 (bottom)', 'Q3', 'Q2', 'Q1 (top)'])

q_colors = {'Q1 (top)': '#0000D2', 'Q2': '#365FD9', 'Q3': '#A0B4D9', 'Q4 (bottom)': '#BFBFBF'}

fig, ax = plt.subplots(figsize=(14, 8))
for q in ['Q4 (bottom)', 'Q3', 'Q2', 'Q1 (top)']:
    mask = df_pos['eng_quartile'] == q
    ax.scatter(df_pos.loc[mask, 'sessions'], df_pos.loc[mask, 'eng_rate'],
               s=70, alpha=0.75, color=q_colors[q], label=q, edgecolors='white', linewidth=0.5)

med_eng  = df_pos['eng_rate'].median()
med_sess = df_pos['sessions'].median()
ax.axhline(y=med_eng,  color=C['dark'], linestyle='--', alpha=0.4, linewidth=1)
ax.axvline(x=med_sess, color=C['dark'], linestyle='--', alpha=0.4, linewidth=1)
ax.text(df_pos['sessions'].max() * 0.7, med_eng + 1, f'Median: {med_eng:.0f}%', fontsize=8, color=C['dark'])
ax.set_xscale('log')
ax.set_xlabel('Sessions', fontsize=11)
ax.set_ylabel('Engagement Rate (%)', fontsize=11)
ax.set_title(f'Property Positioning: {DEEP_SECTOR}', fontweight='bold', fontsize=20)
ax.legend(title='Engagement Quartile', loc='lower right')
ax.grid(alpha=0.3)
save_chart("chart")

# 8c. Top vs Bottom Quartile Table
top_q  = df_props[df_props['eng_quartile'] == 'Q1 (top)']
bot_q  = df_props[df_props['eng_quartile'] == 'Q4 (bottom)']
metrics = {
    'Engagement Rate':   'eng_rate',
    'Organic Search %':  'Organic Search',
    'Paid %':            'Paid',
    'Conversion Rate':   'cvr',
    'Avg Duration (s)':  'avg_duration',
    'New User %':        'new_user_pct',
}
table_data = []
for label, col in metrics.items():
    raw_top = top_q[col].median()
    raw_bot = bot_q[col].median()
    diff    = raw_top - raw_bot
    table_data.append([label, f'{raw_top:.1f}', f'{raw_bot:.1f}',
                        f'+{diff:.1f}' if diff > 0 else f'{diff:.1f}'])

fig, ax = plt.subplots(figsize=(10, 5))
ax.axis('off')
table = ax.table(cellText=table_data,
                 colLabels=['Metric', 'Q1 (top)', 'Q4 (bottom)', 'Gap'],
                 loc='center', cellLoc='center')
table.auto_set_font_size(False); table.set_fontsize(11); table.scale(1.3, 2.0)
for i in range(len(table_data)):
    cell = table[i + 1, 3]
    val  = float(table_data[i][3].replace('+', ''))
    cell.set_text_props(color=C['primary'] if val > 0 else '#CC0000', fontweight='bold')
for j in range(4):
    table[0, j].set_text_props(fontweight='bold')
    table[0, j].set_facecolor('#f0f0f0')
ax.set_title(f'What the Top Quartile Does Differently: {DEEP_SECTOR}',
             fontweight='bold', fontsize=12, pad=20)
save_chart("chart")

# 8d. E-Commerce Funnel (simulated)
funnel_steps  = ['View Item', 'Add to Cart', 'Begin Checkout', 'Purchase']
funnel_sector = np.array([100, rng.uniform(25, 45), rng.uniform(15, 28), rng.uniform(8, 18)])
funnel_cross  = np.array([100, rng.uniform(30, 50), rng.uniform(18, 32), rng.uniform(10, 22)])

fig, ax = plt.subplots(figsize=(12, 7))
x = range(4)
ax.bar(x, funnel_sector, color=C['primary'], alpha=0.8, width=0.6, label=DEEP_SECTOR)
ax.plot(x, funnel_cross, 'k--o', linewidth=1.5, markersize=6, alpha=0.5, label='Cross-sector avg')
ax.set_xticks(x); ax.set_xticklabels(funnel_steps, fontsize=11)
ax.set_ylabel('Conversion Rate (%)', fontsize=11)
ax.set_title(f'E-Commerce Funnel: {DEEP_SECTOR}', fontweight='bold', fontsize=20)
ax.legend(loc='upper right')
for i, val in enumerate(funnel_sector):
    ax.text(i, val + 2, f'{val:.1f}%', ha='center', va='bottom', fontsize=9, color=C['dark'])
    if i > 0:
        drop = (1 - funnel_sector[i] / funnel_sector[i - 1]) * 100
        mid_y = (funnel_sector[i - 1] + funnel_sector[i]) / 2
        ax.annotate(f'-{drop:.0f}%', xy=(i - 0.5, mid_y),
                    fontsize=10, fontweight='bold', color='#365FD9', ha='center', va='center')
ax.set_ylim(0, 120); ax.grid(axis='y', alpha=0.3)
save_chart("chart")

print('\nDone — all charts generated with simulated data.')
