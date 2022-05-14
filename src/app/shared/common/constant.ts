/**
 * 共通定義クラス
 */
export class Constant {
  /** 初期設定値2 */
  public static readonly INIT_SETTING_VAL: any = {
    // アマカリ情報
    amakari: {
      watchRatio: 10,
    },
    // アマカリ詳細フィルタ情報
    amakariFilter: {
      watchType: 1,
      notifyType: 1,
    },
    // 列マスタ
    column: {
      amakari: [
        'checkBox',
        'watch',
        'updateDate',
        'amaImage',
        'amaBaseInfo',
        'keepaGraph',
        'limitPrice',
        'nowPrice',
        'lastPrice',
        'profit',
        'fee',
        'delete',
      ],
    },
  };

  /** 権限マップ */
  public static readonly ROLE_MAP: any = {
    0: '',
    1: '一般ユーザ',
    9: 'システム管理者',
  };
  /** ステータスマップ */
  public static readonly STATUS_MAP: any = {
    '': '未契約',
    trialing: '試用中',
    active: '継続中',
    past_due: '期日経過',
    unpaid: '未払い',
  };
  /** CSV出力タイプマップ */
  public static readonly CSV_TYPE_ARY: any = [
    [1, 'ECザウルス'],
    [2, 'プライスター'],
    [3, 'マカド'],
  ];
  /** CSV価格設定方法マップ */
  public static readonly CSV_METHOD_ARY: any = [
    { value: 0, viewValue: '0：自動変更なし' },
    { value: 1, viewValue: '1：FBA状態合わせ' },
    { value: 2, viewValue: '2：状態合わせ' },
    { value: 3, viewValue: '3：FBA最低価格' },
    { value: 4, viewValue: '4：最低価格' },
    { value: 5, viewValue: '5：カート価格' },
    // { value: 51, viewValue: '51：カート取得最高' },
  ];
  /** CSV配送ルートマップ */
  public static readonly CSV_ROUTE_ARY: any = [
    { value: 0, viewValue: '0：自己発送' },
    { value: 1, viewValue: '1：FBA' },
  ];
  /** カート種別マップ */
  public static readonly CART_MAP: any = {
    '0': '出品者なし',
    '1': 'Amazon',
    '2': 'FBA',
    '3': '自己発送',
    '4': 'カートなし／FBA',
    '5': 'カートなし／自己発送',
  };
  /** サイズ種別マップ */
  public static readonly SIZE_MAP: any = {
    s1: '小型',
    n1: '標１',
    n2: '標２',
    n3: '標３',
    n4: '標４',
    b1: '大１',
    b2: '大２',
    b3: '大３',
    b4: '大４',
    b5: '大５',
    b6: '大６',
    b7: '大７',
    b8: '大８',
    e1: '特１',
    e2: '特２',
    e3: '特３',
    e4: '特４',
    unknown: '不明',
  };
  /** サイズ（ソート対応）マップ */
  public static readonly SIZE_SORT_MAP: any = {
    s1: 1,
    n1: 2,
    n2: 3,
    n3: 4,
    n4: 5,
    b1: 6,
    b2: 7,
    b3: 8,
    b4: 9,
    b5: 10,
    b6: 11,
    b7: 12,
    b8: 13,
    e1: 14,
    e2: 15,
    e3: 16,
    e4: 17,
    unknown: NaN,
  };
  /** カテゴリマップ */
  public static readonly CATEGORY_MAP: any = {
    amazon_devices_display_on_website: 'Amazonデバイス・アクセサリ',
    pantry_display_on_website: 'Amazonパントリー',
    audible_display_on_website: 'Audible オーディオブック',
    home_improvement_display_on_website: 'DIY・工具・ガーデン',
    dvd_display_on_website: 'DVD',
    ebooks_display_on_website: 'Kindleストア',
    software_display_on_website: 'PCソフト',
    download_movie_display_on_website: 'Prime Video',
    toy_display_on_website: 'おもちゃ',
    mobile_application_display_on_website: 'アプリ＆ゲーム',
    gift_card_display_on_website: 'ギフト券',
    video_games_display_on_website: 'ゲーム',
    shoes_display_on_website: 'シューズ＆バッグ',
    jewelry_display_on_website: 'ジュエリー',
    sports_display_on_website: 'スポーツ＆アウトドア',
    digital_music_track_display_on_website: 'デジタルミュージック',
    health_and_beauty_display_on_website: 'ドラッグストア',
    pc_display_on_website: 'パソコン・周辺機器',
    beauty_display_on_website: 'ビューティー',
    baby_product_display_on_website: 'ベビー＆マタニティ',
    pet_products_display_on_website: 'ペット用品',
    hobby_display_on_website: 'ホビー',
    kitchen_display_on_website: 'ホーム＆キッチン',
    music_display_on_website: 'ミュージック',
    major_appliances_display_on_website: '大型家電',
    ce_display_on_website: '家電＆カメラ',
    office_product_display_on_website: '文房具・オフィス用品',
    apparel_display_on_website: '服＆ファッション小物',
    book_display_on_website: '本',
    musical_instruments_display_on_website: '楽器・音響機器',
    english_book_display_on_website: '洋書',
    biss_basic_display_on_website: '産業・研究開発用品',
    watch_display_on_website: '腕時計',
    automotive_display_on_website: '車＆バイク',
    grocery_display_on_website: '食品・飲料・お酒',
  };
  /** 楽天ジャンルマップ */
  public static readonly RAKU_GENRE_MAP: any = {
    '': '総合',
    '100939': 'コスメ・美容',
    '100026': 'パソコン・周辺機器',
    '562637': '家電',
    '566382': 'おもちゃ・ゲーム',
    '101164': 'ホビー',
    '564500': 'スマートフォン・タブレット',
    '211742': 'TV・オーディオ・カメラ',
    '215783': '日用品雑貨・文房具・手芸',
    '558944': 'キッチン用品・食器・調理器具',
    '100938': 'ダイエット・健康',
    '101070': 'スポーツ・アウトドア',
    '112493': '楽器・音響機器',
    '101205': 'テレビゲーム',
    '101240': 'CD・DVD',
    '101213': 'ペット・ペットグッズ',
    '100533': 'キッズ・ベビー・マタニティ',
    '101077': 'ゴルフ',
  };
  /** 期間種別マップ */
  public static readonly RAKU_PERIOD_MAP: any = {
    1: 'リアルタイム',
    2: 'デイリー',
  };
  /** 在庫種別マップ */
  public static readonly RAKU_STOCK_MAP: any = {
    0: '在庫なし',
    1: '在庫あり',
    2: 'すべて',
  };
  /** 列名（リサーチ商品一覧）マップ */
  public static readonly COLUMN_RESEARCH_MAP: any = {
    checkBox: '',
    updateDate: '更新日時',
    addDate: '追加日時',
    rakuImage: '商品画像',
    asin: 'ASIN',
    rakuName: '商品名',
    amaPrice: 'Amazon価格',
    amaSalesFee: '販売手数料',
    shippingFee: '配送料',
    breakEvenPrice: '損益分岐価格',
    rakuPrice: '楽天価格',
    rakuCoupon: '楽天クーポン',
    cashCostPrice: '現金仕入価格',
    cashProfit: '現金利益額',
    rakuItemPoint: 'ショップポイント',
    rakuSpuPoint: 'SPUポイント',
    pointCostPrice: 'P込仕入額',
    pointProfit: 'P込利益額',
    pointProfitRate: 'P込利益率',
    cashProfitRate: '現金利益率',
    amaRank: 'ランキング',
    amaNewSeller: '出品者数',
    amaSize: 'サイズ',
    rakuShopName: '楽天ショップ名',
  };
  /** 列名（アマカリ一覧）マップ */
  public static readonly COLUMN_AMAKARI_MAP: any = {
    checkBox: '',
    watch: '監視',
    updateDate: '日時（更新 / 追加）',
    amaImage: '商品画像',
    amaBaseInfo: '商品基本情報',
    keepaGraph: 'Keepaグラフ',
    category: 'カテゴリ',
    limitPrice: '通知価格',
    nowPrice: '現在最安値',
    lastPrice: '前回最安値',
    fee: '手数料（販売 / 配送）',
    profit: '差分',
    delete: '削除',
  };
}
