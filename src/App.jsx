import React, { useState, useRef } from 'react'
import { Layout, Typography, Button, message, Space, Flex } from 'antd'
import { DownloadOutlined, UploadOutlined, SaveOutlined } from '@ant-design/icons'
import CardPreview from './components/CardPreview'
import CardForm from './components/CardForm'
import html2canvas from 'html2canvas'
import './styles/App.css'

const { Header, Content } = Layout
const { Title } = Typography

const initialCardData = {
  title: '龙之融合',
  cost: 3,
  description: '## 效果说明\n\n从场上、墓地以及除外的自己融合召唤1只「龙」融合怪兽。\n\n**注意：** 此卡只能在中国官方店使用。',
  emoji: '🐉'
}

function App() {
  const [cardData, setCardData] = useState(initialCardData)
  const cardRef = useRef(null)

  const handleCardDataChange = (newData) => {
    setCardData(newData)
  }

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(cardData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${cardData.title || 'card'}.json`
    link.click()
    URL.revokeObjectURL(url)
    message.success('导出 JSON 成功!')
  }

  const importJson = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result)
          setCardData({ ...initialCardData, ...data })
          message.success('导入成功!')
        } catch (error) {
          message.error('导入失败，请检查文件格式!')
        }
      }
      reader.readAsText(file)
    }
  }

  const exportImage = async () => {
    if (cardRef.current) {
      try {
        const canvas = await html2canvas(cardRef.current, {
          backgroundColor: null,
          scale: 3,
          useCORS: true,
        })
        const url = canvas.toDataURL('image/png')
        const link = document.createElement('a')
        link.href = url
        link.download = `${cardData.title || 'card'}.png`
        link.click()
        message.success('导出图片成功!')
      } catch (error) {
        message.error('导出图片失败!')
      }
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        background: 'rgba(255, 255, 255, 0.95)', 
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <Flex align="center" gap={16}>
          <Title level={3} style={{ margin: 0, color: '#667eea' }}>🃏 卡牌生成器</Title>
        </Flex>
        <Space>
          <Button 
            icon={<UploadOutlined />} 
            onClick={() => document.getElementById('import-file').click()}
          >
            导入卡片
          </Button>
          <input
            type="file"
            id="import-file"
            accept=".json"
            style={{ display: 'none' }}
            onChange={importJson}
          />
          <Button icon={<SaveOutlined />} onClick={exportJson}>
            导出卡片
          </Button>
          <Button 
            type="primary" 
            icon={<DownloadOutlined />} 
            onClick={exportImage}
          >
            导出图片
          </Button>
        </Space>
      </Header>
      <Content style={{ padding: '24px' }}>
        <Flex gap={48} wrap="wrap" justify="center" align="flex-start">
          <CardForm cardData={cardData} onCardDataChange={handleCardDataChange} />
          <CardPreview cardData={cardData} cardRef={cardRef} />
        </Flex>
      </Content>
    </Layout>
  )
}

export default App
