import React from 'react'
import { Card, Typography } from 'antd'
import { marked } from 'marked'
import './CardPreview.css'

const { Text } = Typography

const CardPreview = ({ cardData, cardRef }) => {
  const { title, cost, description, emoji, bgColor, headerBgColor, imageBgColor } = cardData

  const parseMarkdown = (text) => {
    if (!text) return ''
    return marked(text)
  }

  const parseRgb = (colorStr) => {
    if (!colorStr) return null
    const rgbMatch = colorStr.match(/^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)$/)
    if (rgbMatch) {
      return `rgb(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]})`
    }
    return null
  }

  const getBgStyle = (colorStr) => {
    const rgb = parseRgb(colorStr)
    if (rgb) {
      return { background: rgb }
    }
    return {}
  }

  const getHeaderStyle = () => {
    const rgb = parseRgb(headerBgColor)
    if (rgb) {
      return { background: rgb }
    }
    return {}
  }

  const getImageStyle = () => {
    const rgb = parseRgb(imageBgColor)
    if (rgb) {
      return { background: rgb }
    }
    return {}
  }

  return (
    <div className="card-container" ref={cardRef}>
      <div className="card-frame" style={getBgStyle(bgColor)}>
        <div className="card-header" style={getHeaderStyle()}>
          <div className="card-cost">
            <span className="cost-number">{cost}</span>
          </div>
          <div className="card-title">{title}</div>
        </div>
        
        <div className="card-image-section" style={getImageStyle()}>
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
