import { useRef, useState } from 'react'
import * as pdfjsLib from 'pdfjs-dist'
import 'pdfjs-dist/legacy/build/pdf.worker.mjs'
import Tesseract from 'tesseract.js'

interface PDFViewerProps {
  file: string // PDF文件的URL
}

const PDFViewer = ({ file }: PDFViewerProps) => {
  const pdfCanvas = useRef<HTMLDivElement>(null)

  const loadPDF = async (url: string) => {
    const pdf = await pdfjsLib.getDocument({ url }).promise

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const viewport = page.getViewport({ scale: 1 })

      page.getTextContent().then(function (textContent) {
        let text = ''
        textContent.items.forEach(function (item) {
          text += item.str + ' '
        })

        // 提取的文本
        console.log(text)
      })

      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')!
      canvas.width = viewport.width
      canvas.height = viewport.height
      await page.render({ canvasContext: context, viewport }).promise

      const imageUrl = canvas.toDataURL('image/png')

      // const a = new Worker(imageUrl)

      // console.log(imageUrl)

      // Tesseract.recognize(
      //   imageUrl, //表示图片路径
      //   'chi_sim' //表示识别的目标语言
      // ).then((d) => {
      //   //获取识别的文本
      //   console.log(d, 6666)
      // })

      pdfCanvas.current!.appendChild(canvas)
    }
  }

  if (file) {
    loadPDF(file)
  }

  return (
    <div className="h-full w-full justify-center overflow-auto rounded-lg">
      <div ref={pdfCanvas}></div>
    </div>
  )
}

export default PDFViewer
