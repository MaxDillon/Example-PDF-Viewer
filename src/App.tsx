import { createEffect, createSignal, type Component } from "solid-js";

import logo from "./logo.svg";
import styles from "./App.module.css";

async function getPdfBlob() {
  let response = await fetch("./report.pdf");
  let data = await response.blob();
  console.log(data);
  return data;
}

const App: Component = () => {
  const [pdfUrl, setPdfUrl] = createSignal("about:blank");
  getPdfBlob();

  async function load() {
    const content = await getPdfBlob();
    const url = URL.createObjectURL(content);
    setPdfUrl(url);
  }

  createEffect(() => {
    load();
  });

  return (
    <div class={styles.App}>
      <iframe src={pdfUrl()} />
    </div>
  );
};

export default App;
