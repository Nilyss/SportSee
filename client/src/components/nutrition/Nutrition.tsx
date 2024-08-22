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
  switch (type) {
    case 'calorieCount':
      icon = calIcon
      break
    case 'proteinCount':
      icon = protIcon
      break
    case 'carbohydrateCount':
      icon = carbIcon
      break
    case 'lipidCount':
      icon = fatIcon
      break
    default:
      break
  }

  return (
    <li className={"nutritionItem"}>
      <figure>
        <img src={icon} alt={type} />
      </figure>
      <p>{value}</p>
    </li>
  )
}
