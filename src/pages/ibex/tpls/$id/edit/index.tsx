import {
  tplReadOneApiIbexByTplsid,
  tplUpdateApiIbexByTplsid,
} from "@/services/ibex/tpl"
import { RollbackOutlined } from "@ant-design/icons"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { history, useParams } from "@umijs/max"
import { Button, Card } from "antd"
import TplForm from "../../_components/tpl-form"

export default function TplEdit() {
  const { id } = useParams()
  const queryClient = useQueryClient()

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
          编辑脚本
        </div>
      }
    >
      {tplData ? (
        <TplForm
          initialValues={tplData}
          onFinish={async (values) => {
            await tplUpdateApiIbexByTplsid({ id: id!.toString() }, values)
            history.replace("/ibex/tpls")
            queryClient.invalidateQueries({ queryKey: ["tpl"] })
          }}
        />
      ) : null}
    </Card>
  )
}
