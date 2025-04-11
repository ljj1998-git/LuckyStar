<template>
  <div id="pdf-container">
    <div
      v-for="item in state.pdfPages"
      :id="`page-${item}`"
      :key="item"
      class="pdf-box relative"
    >
      <canvas :key="item" :id="'pdfCanvas' + item" class="canvas-pdf" />
    </div>
  </div>
</template>
<script setup lang="ts">
import * as PDF from "pdfjs-dist";
import { PDFDocumentProxy, TextLayer } from "pdfjs-dist";
import "pdfjs-dist/web/pdf_viewer.css";
import "pdfjs-dist/legacy/build/pdf.worker.mjs";
import demo5 from "./demo5.pdf";
interface PDFViewerProps {
  file: string; // PDF文件的URL
}

const state = reactive<any>({
  pdfPages: "", // 页数
  pdfWidth: "", // 宽度
  pdfSrc: "", // 地址
  pdfScale: 1.0, // 放大倍数
});

onMounted(() => {
  // window.ipcRenderer.on("window-size-changed", (event, { height, width }) => {
  //   console.log(width, height);
  //   PDFViewer();
  // });
});

const PDFViewer = async () => {
  const pdf = await PDF.getDocument(demo5).promise;
  state.pdfPages = pdf.numPages;
  for (let i = 1; i < pdf.numPages; i++) {
    loadPDFToCanvas(i, pdf);
  }
};

PDFViewer();

/**
 * 将 PDF 页面加载到指定的 canvas 元素中
 * @param {number} num - PDF 页面的编号
 * @param {PDFDocumentProxy} pdf - PDF 文档的代理对象
 */
const loadPDFToCanvas = async (num: number, pdf: PDFDocumentProxy) => {
  // 获取指定页码的 PDF 页面
  const page = await pdf.getPage(num);

  // 获取对应的 canvas 元素
  const canvas: any = document.getElementById(`pdfCanvas${num}`);
  // 获取 canvas 的 2D 绘图上下文
  const ctx = canvas.getContext("2d");
  // 计算设备像素比率与 backing store 像素比率的比值
  const dpr = window.devicePixelRatio || 1;
  const bsr =
    ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio ||
    1;
  const ratio = dpr / bsr;
  // 根据当前 PDF 缩放比例获取视口
  const viewport = page.getViewport({ scale: state.pdfScale });
  // 调整 canvas 元素的尺寸以匹配 PDF 页面尺寸
  canvas.width = viewport.width * ratio;
  canvas.height = viewport.height * ratio;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  // 更新状态中的 PDF 宽度
  state.pdfWidth = `${viewport.width}px`;
  // 设置 canvas 上下文的变换矩阵以适应高 DPI 屏幕
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  // 将 PDF 页面渲染到 canvas 上下文中
  const renderContext = {
    canvasContext: ctx,
    viewport,
  };
  await page.render(renderContext).promise;

  const textContent = await page.getTextContent();

  let pageDiv = document.getElementById(`page-${num}`);

  const textLayerDiv = document.createElement("div");
  textLayerDiv.setAttribute("class", "textLayer");
  textLayerDiv.setAttribute(
    "style",
    `width: ${viewport.width}px; margin: 0 auto;position: absolute;`
  );
  // 将文本图层div添加至每页pdf的div中
  pageDiv!.appendChild(textLayerDiv);

  // 创建新的TextLayerBuilder实例
  const textLayer = new TextLayer({
    textContentSource: textContent,
    container: textLayerDiv!,
    viewport: viewport,
  });

  textLayer.render();
};
</script>
