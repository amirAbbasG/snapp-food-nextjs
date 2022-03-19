import Image from "next/image";

import styles from "../styles/Home.module.css";
import { MyHead } from "../src/components";

export default function Home() {
  return (
    <div className={styles.container}>
      <MyHead
        description="سفارش انواع غذا به سریع ترین زمان ارسال"
        title="صفحه اصلی"
        keywords="test"
      />

      <main className={styles.main}>
        <h1>hellooo</h1>
      </main>
    </div>
  );
}
