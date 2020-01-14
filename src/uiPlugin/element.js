import Vue from 'vue'

import {
  Container,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItem,
  Tabs,
  TabPane,
  Input,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Form,
  FormItem,
  Col,
  DatePicker,
  TimePicker,
  Select,
  Option,
  CheckboxButton,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Table,
  TableColumn,
  Pagination,
  Row,
  Alert,
  Message,
  Switch,
  MessageBox,
  Dialog
} from 'element-ui'

Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Input)
Vue.use(Button)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Col)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Select)
Vue.use(Option)
Vue.use(CheckboxButton)
Vue.use(CheckboxGroup)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(TableColumn)
Vue.use(Table)
Vue.use(Pagination)
Vue.use(Row)
Vue.use(Alert)
Vue.use(Switch)
Vue.use(Dialog)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
