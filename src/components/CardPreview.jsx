import React from 'react'
import { Card, Typography } from 'antd'
import { marked } from 'marked'
import './CardPreview.css'

const { Text } = Typography

const CardPreview = ({ cardData, cardRef }) => {
  const { title, cost, description, emoji, bgColor } = cardData

  const parseMarkdown = (text) => {
    if (!text) return ''
    return marked(text)
  }

  const getBgStyle = () => {
    if (!bgColor) return {}
    const rgbMatch = bgColor.match(/^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)$/)
    if (rgbMatch) {
      return {
        background: `rgb(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]})`
      }
    }
    return {}
  }

  return (
    <div className="card-container" ref={cardRef}>
      <div className="card-frame" style={getBgStyle()}>
        <div className="card-header">
          <div className="card-cost">
            <span className="cost-number">{cost}</span>
          </div>
          <div className="card-title">{title}</div>
        </div>
        
        <div className="card-image-section">
          <div className="card-emoji">{emoji}</div>
        </div>
        
        <div className="card-description-section">
          <div 
            className="card-description"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(description) }}
          />
        </div>
      </div>
    </div>
  )
}

export default CardPreview
