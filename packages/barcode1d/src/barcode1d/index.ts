import { Editor, Command, ElementType } from '@hufe921/canvas-editor'
import JsBarcode from 'jsbarcode'

function convertSvgElementToBase64(svgElement: HTMLElement | SVGSVGElement) {
  return `data:image/svg+xml;base64,${btoa(
    decodeURIComponent(svgElement.outerHTML)
  )}`
}

export type CommandWithBarcode1D = Command & {
  executeInsertBarcode1D(
    content: string,
    width: number,
    height: number,
    options?: JsBarcode.Options
  ): void
}

export default function barcodePlugin(editor: Editor) {
  const command = <CommandWithBarcode1D>editor.command

  // 条形码
  command.executeInsertBarcode1D = (
    content: string,
    width: number,
    height: number,
    options?: JsBarcode.Options
  ) => {
    const svgElement = document.createElement('svg')
    // 解析一维码
    JsBarcode(svgElement, content, options)
    // 插入
    command.executeInsertElementList([
      {
        type: ElementType.IMAGE,
        value: convertSvgElementToBase64(svgElement),
        width,
        height
      }
    ])
  }
}
