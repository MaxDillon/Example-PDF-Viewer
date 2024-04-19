import { createEffect, createSignal, type Component } from "solid-js";
import styles from "./App.module.css";

async function getPdfBlob() {
  let response = await fetch("./report.pdf");
  let data = await response.blob();
  console.log(data);
  return data;
}

const App: Component = () => {
  const [pdfData, setPdfData] = createSignal<Blob>();

  const pdfUrl = () =>
    pdfData() ? URL.createObjectURL(pdfData()!) : "about:blank";

  createEffect(async () => {
    const content = await getPdfBlob();
    setPdfData(content);
  });

  return (
    <div class={styles.App}>
      <iframe src={pdfUrl()} />
    </div>
  );
};

export default App;
