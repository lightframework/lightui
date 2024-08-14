import {
  tplCreateApiIbexTpls,
  tplReadOneApiIbexByTplsid,
} from "@/services/ibex/tpl"
import { RollbackOutlined } from "@ant-design/icons"
import { useQuery } from "@tanstack/react-query"
import { history, useSearchParams } from "@umijs/max"
import { Button, Card } from "antd"
import TplForm from "../_components/tpl-form"

export default function AddTpl() {
  const [searchParams] = useSearchParams()
  const id = Number.parseInt(searchParams.get("cloneId") ?? "")

  const { data: tplData } = useQuery({
    queryKey: ["tpl", id],
    queryFn: () =>
      tplReadOneApiIbexByTplsid({ id: id!.toString() }).then(
        (res) => res.data?.data,
      ),
    enabled: !!id,
  })

  return (
    <Card
      title={
        <div>
          <Button
            type="text"
            icon={<RollbackOutlined />}
            className="mr-2"
            onClick={() => history.replace("/ibex/tpls")}
          />
          添加脚本
        </div>
      }
    >
      {!id || tplData ? (
        <TplForm
          initialValues={tplData}
          onFinish={async (values) => {
            await tplCreateApiIbexTpls(values)
            history.replace("/ibex/tpls")
          }}
        />
      ) : null}
    </Card>
  )
}
