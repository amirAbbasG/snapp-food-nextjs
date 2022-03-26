import Head from "next/head";

const MyHead = ({ title, description, keywords }) => {
  return (
    <Head>
      <title> اسنپ فود | {title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <meta charSet="utf-8" />
      <link rel="icon" type="image/png" href="/images/logo.png" />
      <link rel="canonical" href="https://snappfood.ir" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      <meta
        property="business:contact_data:street_address"
        content="خیابان آفریقا، خیابان شهید عاطفی غربی، خیابان مهرداد، پلاک ۱، طبقه 5 جنوبی"
      />
      <meta property="business:contact_data:locality" content="تهران" />
      <meta property="business:contact_data:country_name" content="IR" />
      <meta
        property="business:contact_data:phone_number"
        content="+98-021-96612"
      />
      <meta
        property="business:contact_data:website"
        content="https://www.snappfood.ir"
      />
      <meta
        property="business:contact_data:email"
        content="info@snappfood.ir"
      />
      <meta property="place:location:latitude" content="35.7733181" />
      <meta property="place:location:longitude" content="51.4182976" />
      <meta
        property="og:title"
        content="سفارش آنلاین غذا، میوه، نان، شیرینی و ..."
      />
      <meta property="og:sitename" content="Snappfood" />
      <meta property="og:url" content="https://snappfood.ir" />
      <meta
        property="og:image"
        content="https://snappfood.ir/images/logo.png"
      />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="fa_IR" />
      <meta property="og:locale:alternate" content="En_US" />
      <meta
        property="og:image:secure_url"
        content="https://snappfood.ir/images/logo.png"
      />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="150" />
      <meta property="og:image:height" content="150" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@snappfood" />
      <meta
        name="twitter:title"
        content="سفارش آنلاین غذا، میوه، نان، شیرینی و ..."
      />
      <meta
        name="twitter:text:description"
        content="اسنپ فود (زودفود قدیم) سامانه سفارش آنلاین غذا، شیرینی و خرید آنلاین از کافی شاپ و سوپرمارکت ها در تهران، کرج، شیراز، اصفهان، مشهد و سراسر ایران"
      />
      <meta name="twitter:creator" content="Snappfood" />
      <meta name="twitter:url" content="https://snappfood.ir" />
      <meta
        name="twitter:image"
        content="https://snappfood.ir/static/images/favicon/favicon-96x96.png"
      />
      <meta property="twitter:app:id:iphone" content="id1244427016" />
      <meta property="twitter:app:id:ipad" content="id1244427016" />
      <meta
        property="twitter:app:id:googleplay"
        content="com.zoodfood.android"
      />
      <meta
        property="twitter:app:url:iphone"
        content="https://itunes.apple.com/us/app/zoodfood/id1244427016"
      />
      <meta
        property="twitter:app:url:ipad"
        content="https://itunes.apple.com/us/app/zoodfood/id1244427016"
      />
      <meta property="twitter:app:url:googleplay" />
      <meta property="twitter:app:country" content="ir" />
      <meta
        property="twitter:app:name:googleplay"
        content="سفارش آنلاین غذا، میوه، نان، شیرینی و ..."
      />
      <meta
        property="twitter:app:name:ipad"
        content="سفارش آنلاین غذا، میوه، نان، شیرینی و ..."
      />
      <meta
        property="twitter:app:name:iphone"
        content="سفارش آنلاین غذا، میوه، نان، شیرینی و ..."
      />
      <meta name="theme-color" content="#F700A2" />
    </Head>
  );
};

export default MyHead;
