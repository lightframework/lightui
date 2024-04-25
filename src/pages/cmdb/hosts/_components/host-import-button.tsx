import { Button, Upload, message } from "antd"
import { useState } from "react"

export default function HostImportButton() {
  const [loading, setLoading] = useState(false)

  return (
    <Upload
      name="file"
      maxCount={1}
      accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      action="/api/cmdb/hosts/upload"
      headers={{
        authorization: localStorage.getItem("token")!,
      }}
      itemRender={() => null}
      customRequest={(option) => {
        const getError = (option, xhr) => {
          const msg = "cannot "
            .concat(option.method, " ")
            .concat(option.action, " ")
            .concat(xhr.status, "'")
          const err = new Error(msg)
          err.status = xhr.status
          err.method = option.method
          err.url = option.action
          return err
        }

        const getBody = (xhr) => {
          if (xhr.responseType && xhr.responseType !== "text") {
            return xhr.response
          }
          const text = xhr.responseText || xhr.response

          if (!text) {
            return text
          }

          try {
            return JSON.parse(text)
          } catch (e) {
            return text
          }
        }

        // eslint-disable-next-line no-undef
        const xhr = new XMLHttpRequest()
        xhr.responseType = "blob"

        if (option.onProgress && xhr.upload) {
          xhr.upload.onprogress = function progress(e) {
            if (e.total > 0) {
              e.percent = (e.loaded / e.total) * 100
            }

            option.onProgress(e)
          }
        } // eslint-disable-next-line no-undef

        const formData = new FormData()

        if (option.data) {
          Object.keys(option.data).forEach(function (key) {
            const value = option.data[key] // support key-value array data

            if (Array.isArray(value)) {
              value.forEach(function (item) {
                // { list: [ 11, 22 ] }
                // formData.append('list[]', 11);
                formData.append("".concat(key, "[]"), item)
              })
              return
            }

            formData.append(key, option.data[key])
          })
        } // eslint-disable-next-line no-undef

        if (option.file instanceof Blob) {
          formData.append(option.filename, option.file, option.file.name)
        } else {
          formData.append(option.filename, option.file)
        }

        xhr.onerror = function error(e) {
          option.onError(e)
        }

        xhr.onload = function onload() {
          // allow success when 2xx status
          // see https://github.com/react-component/upload/issues/34
          if (xhr.status < 200 || xhr.status >= 300) {
            return option.onError(getError(option, xhr), getBody(xhr))
          }

          return option.onSuccess(getBody(xhr), xhr)
        }

        xhr.open(option.method, option.action, true) // Has to be after `.open()`. See https://github.com/enyo/dropzone/issues/179

        if (option.withCredentials && "withCredentials" in xhr) {
          xhr.withCredentials = true
        }

        const headers = option.headers || {} // when set headers['X-Requested-With'] = null , can close default XHR header
        // see https://github.com/react-component/upload/issues/33

        if (headers["X-Requested-With"] !== null) {
          xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
        }

        Object.keys(headers).forEach(function (h) {
          if (headers[h] !== null) {
            xhr.setRequestHeader(h, headers[h])
          }
        })
        xhr.send(formData)
        return {
          abort: function abort() {
            xhr.abort()
          },
        }
      }}
      onChange={(info) => {
        if (info.file.status !== "uploading") {
          setLoading(true)
        }
        if (info.file.status === "done") {
          setLoading(false)

          const blob = info.fileList[0].response

          // 后端框架原因，响应类型都是json，根据size判断是否实际类型
          if (blob.size === 34) {
            const reader = new FileReader()
            reader.readAsText(blob, "utf-8")
            reader.onload = () => {
              const data = JSON.parse(reader.result as string)
              if (data.msg === "OK") {
                message.success("导入成功")
              } else {
                message.error(data.msg ?? "未知原因导入失败")
              }
            }
          } else {
            message.error("导入失败")
            const url = window.URL.createObjectURL(blob)

            let filename = "result.xlsx"

            const a = document.createElement("a")
            a.href = url
            a.download = filename
            a.click()

            window.URL.revokeObjectURL(url)
          }
        } else if (info.file.status === "error") {
          setLoading(false)
          message.error("文件上传失败")
        }
      }}
    >
      <Button type="primary" loading={loading}>
        导入
      </Button>
    </Upload>
  )
}
