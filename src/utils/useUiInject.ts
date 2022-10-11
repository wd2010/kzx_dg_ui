
import { Button, Upload } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';

export function useUiInject(app: any) {
  app
  .use(Button)
  .use(Upload)

}