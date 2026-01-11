import React from 'react'
import { Form, InputNumber, Input, Button, Space, Divider, Typography, message } from 'antd'
import { CopyOutlined, ClearOutlined } from '@ant-design/icons'
import './CardForm.css'

const { TextArea } = Input
const { Text } = Typography

const CardForm = ({ cardData, onCardDataChange }) => {
  const [form] = Form.useForm()

  const handleValuesChange = (changedValues, allValues) => {
    onCardDataChange(allValues)
  }

  const handleReset = () => {
    form.resetFields()
    onCardDataChange({
      title: '',
      cost: 1,
      description: '',
      emoji: ''
    })
    message.success('已重置表单')
  }

  const copyTemplate = () => {
    const template = `## 效果说明

这是一个卡牌效果的模板。

### 诱发效果
- 条件：满足特定条件时
- 效果：可以发动以下效果

### 注意事项
1. 请遵守游戏规则
2. 效果处理优先顺序`
    form.setFieldsValue({ description: template })
    onCardDataChange({ ...cardData, description: template })
    message.success('模板已复制!')
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <Text strong style={{ fontSize: 18 }}>📝 卡片信息</Text>
      </div>
      
      <Form
        form={form}
        layout="vertical"
        initialValues={cardData}
        onValuesChange={handleValuesChange}
        className="card-form"
      >
        <Form.Item
          name="emoji"
          label={
            <Text strong>
              🎨 卡图表情
              <Text type="secondary" style={{ marginLeft: 8, fontSize: 12 }}>
                (填写1-2个emoji作为卡图)
              </Text>
            </Text>
          }
          rules={[{ required: true, message: '请输入卡图 emoji!' }]}
        >
          <Input 
            placeholder="例如: 🐉🔥"
            maxLength={4}
            style={{ width: 200 }}
          />
        </Form.Item>

        <Form.Item
          name="title"
          label={
            <Text strong>
              📛 卡片标题
              <Text type="secondary" style={{ marginLeft: 8, fontSize: 12 }}>
                (填写卡牌名称)
              </Text>
            </Text>
          }
          rules={[{ required: true, message: '请输入卡片标题!' }]}
        >
          <Input placeholder="例如: 龙之融合" />
        </Form.Item>

        <Form.Item
          name="cost"
          label={
            <Text strong>
              💎 费用
              <Text type="secondary" style={{ marginLeft: 8, fontSize: 12 }}>
                (填写使用此卡所需的费用)
              </Text>
            </Text>
          }
          rules={[{ required: true, message: '请输入费用!' }]}
        >
          <InputNumber 
            min={0} 
            max={99} 
            placeholder="0-99"
            style={{ width: 200 }}
          />
        </Form.Item>

        <Form.Item
          name="description"
          label={
            <Space>
              <Text strong>📜 详细描述</Text>
              <Text type="secondary" style={{ fontSize: 12 }}>(支持 Markdown 语法)</Text>
            </Space>
          }
          rules={[{ required: true, message: '请输入卡片描述!' }]}
        >
          <TextArea 
            rows={10} 
            placeholder="## 效果说明&#10;&#10;填写卡牌效果..." 
            className="description-textarea"
          />
        </Form.Item>

        <Form.Item>
          <Space wrap>
            <Button icon={<CopyOutlined />} onClick={copyTemplate}>
              插入模板
            </Button>
            <Button icon={<ClearOutlined />} onClick={handleReset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>

      <Divider />
      
      <div className="markdown-help">
        <Text strong style={{ marginBottom: 8, display: 'block' }}>📖 Markdown 语法提示:</Text>
        <ul style={{ margin: 0, paddingLeft: 20, fontSize: 12 }}>
          <li><code>## 标题</code> - 二级标题</li>
          <li><code>**粗体**</code> - 粗体文字</li>
          <li><code>*斜体*</code> - 斜体文字</li>
          <li><code>- 项目</code> - 无序列表</li>
          <li><code>1. 项目</code> - 有序列表</li>
        </ul>
      </div>
    </div>
  )
}

export default CardForm
