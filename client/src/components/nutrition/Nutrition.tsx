// styles
import './nutrition.scss'

// assets
import calIcon from '../../assets/icons/calories-icon.svg'
import carbIcon from '../../assets/icons/carbs-icon.svg'
import fatIcon from '../../assets/icons/fat-icon.svg'
import protIcon from '../../assets/icons/protein-icon.svg'

// types
import { ReactElement } from 'react'

interface INutritionProps {
  type: string
  value: number
}

export default function Nutrition({
  type,
  value,
}: INutritionProps): ReactElement {
  let icon: string = ''
  let unit: string = ''
  let label: string = ''

  switch (type) {
    case 'calorieCount':
      icon = calIcon
      unit = 'kCal'
      label = 'Calories'
      break
    case 'proteinCount':
      icon = protIcon
      unit = 'g'
      label = 'Proteines'
      break
    case 'carbohydrateCount':
      icon = carbIcon
      unit = 'g'
      label = 'Glucides'
      break
    case 'lipidCount':
      icon = fatIcon
      unit = 'g'
      label = 'Lipides'
      break
    default:
      break
  }

  const reformatValue = (value: number) => {
    const updatedValue = (value / 1000).toFixed(3)
    return updatedValue.replace('.', ',')
  }

  return (
    <li className={'nutritionItem'}>
      <figure>
        <img src={icon} alt={type} />
      </figure>
      <div className={'nutritionItemValues'}>
        <p>
          {value && value >= 1000 ? reformatValue(value) : value}
          {unit}
        </p>
        <p>{label}</p>
      </div>
    </li>
  )
}
