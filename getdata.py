import datetime
import requests
import re
import tabula
import pandas as pd
print("=========開始=========")
# import

# ==========================================================
# PDFのリンクを取得する
load_url = "https://www.omu.ac.jp/about/efforts/covid19/"  # PDFのリンクが掲載されるWebページ
html = requests.get(load_url)


urls = re.findall(r'covid19-no-hasseijokyo_\d{8}.pdf', html.text)
pdf_path = "https://www.omu.ac.jp/assets/" + urls[0]

print("データ取得元URL")
print(urls)

# ==========================================================
# PDFのからデータを取得し、処理をする
# テーブルの軸線でセルを判定してデータを取得
dfs = tabula.read_pdf(pdf_path, lattice=True, pandas_options={
                      'header': None}, pages='all')

use_df = dfs[2].drop(0, axis=0)
for df in dfs[3:]:
    use_df = pd.concat([use_df, df])
use_df = use_df[use_df[0] != "不明"]
use_df.reset_index(drop=True)


def to_datetime(i):
    return datetime.datetime.strptime("2022/"+str(i).split("(")[0], '%Y/%m/%d')


use_df[0] = use_df[0].apply(to_datetime)


def to_timestamp(i):
    return i.timestamp()


use_df[6] = use_df[0].apply(to_timestamp)


def to_number(i):
    return int(i[:len(i)-1])


use_df[2] = use_df[2].apply(to_number)
use_df[3] = use_df[3].replace("阿部野", "阿倍野")  # 文字の誤りを修正

# 旧府大
gb_opu = use_df[use_df[3] == '中百舌鳥・羽曳野・りんくう'].groupby(0)
opu = pd.DataFrame(gb_opu[2].sum()).rename(columns={2: 'opu'})
# 旧市大
gb_ocu = use_df[use_df[3] != '中百舌鳥・羽曳野・りんくう'].groupby(0)
ocu = pd.DataFrame(gb_ocu[2].sum()).rename(columns={2: 'ocu'})
# 公立大
gb_omu = use_df.groupby(0)
omu = pd.DataFrame(gb_omu[2].sum()).rename(columns={2: 'omu'})

# 統合
all = pd.concat([omu, opu, ocu], axis=1).fillna(0)
all["opu"] = all["opu"].astype('int')
all["ocu"] = all["ocu"].astype('int')
print(all)

# CSVファイルへ書き出し
all.to_csv("data/graph_data.csv")
print("SUCCESS")
print("=========終了=========")
