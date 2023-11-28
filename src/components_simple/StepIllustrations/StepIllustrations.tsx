import Image, {StaticImageData} from 'next/image'
import {ReactNode, useState} from 'react'
import SwipeableViews, {SwipeableViewsProps} from 'react-swipeable-views'
import styles from './stepillustrations.module.css'

interface IllustrationStepperStepProps {
  title: string
  image: StaticImageData
}

interface IllustrationStepperProps {
  steps: IllustrationStepperStepProps[]
}

// This package types don't work well with React 18
// We redefine its type manually
// It's not maintained and we should remove it anyway
const SwipeableViewsFixed = SwipeableViews as any as (props: SwipeableViewsProps) => ReactNode

export const IllustrationStepper = ({steps}: IllustrationStepperProps) => {
  return (
    <>
      <IllustrationStepperMobile steps={steps} />
      <IllustrationStepperDesktop steps={steps} />
    </>
  )
}

const IllustrationStepperMobile = ({steps}: IllustrationStepperProps) => {
  const [index, setIndex] = useState(0)
  return (
    <div className="lg:hidden">
      <SwipeableViewsFixed enableMouseEvents index={index} onChangeIndex={setIndex}>
        {steps.map(step => (
          <div key={step.title}>
            <div className="flex justify-center">
              <Image src={step.image} alt={''} priority={steps[0] === step} width={243} height={240} />
            </div>
            <p className="text-center my-4" dangerouslySetInnerHTML={{__html: step.title}} />
          </div>
        ))}
      </SwipeableViewsFixed>
      <ul className="mt-1 flex justify-center list-none p-0 ">
        {steps.map((_, i) => {
          const current = i === index
          return (
            <li key={_.title}>
              <button
                aria-current={current}
                onClick={() => setIndex(i)}
                className={`h-5 w-5 mx-2 focus:outline-2 focus:outline-blue-500 border-2 border-solid rounded-full ${
                  current ? 'border-scbluefrance bg-scbluefrance' : 'border-gray-400'
                }`}
              >
                <span className="sr-only">{`Étape ${i + 1} sur ${steps.length}`}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const IllustrationStepperDesktop = ({steps}: IllustrationStepperProps) => {
  return (
    <ol className="items-center hidden lg:flex">
      {steps.map(({image, title}) => (
        <li key={title} className={`${styles.steps_desktop} flex flex-col items-center text-center relative flex-1 mb-10`}>
          <div className="w-full">
            <Image width={226} height={224} src={image} alt={''} />
          </div>
          <p
            className="flex items-center mx-1 my-0 text-sm xl:text-base font-medium max-w-xs h-16"
            dangerouslySetInnerHTML={{__html: title}}
          />
        </li>
      ))}
    </ol>
  )
}
