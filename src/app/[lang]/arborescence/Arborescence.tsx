'use client'

import {Box, Checkbox, Radio, useTheme} from '@mui/material'
import Icon from '@mui/material/Icon'
import {styleUtils} from 'core/theme'
import {getOptionsFromInput, getPlaceholderFromInput} from 'components_feature/reportFlow/Details/DetailInputsUtils'
import {useEffect, useState} from 'react'
import {Page} from '../../../components_simple/Page'
import {Txt} from '../../../components_simple/Txt'
import {IconBtn} from '../../../alexlibs/IconBtn'
import {fnSwitch} from '../../../utils/FnSwitch'
import {
  allVisibleAnomalies,
  instanceOfAnomaly,
  instanceOfSubcategoryWithInfoWall,
  instanceOfSubcategoryWithInputs,
} from '../../../anomalies/Anomalies'
import {Anomaly, DetailInputType, Subcategory, SubcategoryWithInfoWall, StandardSubcategory} from '../../../anomalies/Anomaly'
import Button from '@codegouvfr/react-dsfr/Button'
import {useI18n} from '../../../i18n/I18n'
import {ContentPageContainer} from 'components_simple/PageContainers'

const Node = ({anomaly, open}: {anomaly: Anomaly | Subcategory; open?: boolean}) => {
  const iconWidth = 40
  const iconMargin = 8
  const theme = useTheme()

  const title = instanceOfAnomaly(anomaly) ? anomaly.category : anomaly.title
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    setIsOpen(!!open)
  }, [open])

  return (
    <Box sx={{display: 'flex', alignItems: 'flex-start', mb: 2}}>
      <Box
        sx={{
          width: iconWidth,
          marginRight: `${iconMargin}px`,
        }}
      >
        {anomaly.subcategories ? (
          <IconBtn color="primary" onClick={() => setIsOpen(_ => !_)}>
            <Icon>{isOpen ? 'keyboard_arrow_down' : 'keyboard_arrow_right'}</Icon>
          </IconBtn>
        ) : (
          <IconBtn disabled>
            <Icon>remove</Icon>
          </IconBtn>
        )}
      </Box>
      <Box>
        <Box sx={{minHeight: 42, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          <Txt block>
            <span dangerouslySetInnerHTML={{__html: title}} /> <Txt color="hint">{anomaly.id}</Txt>
          </Txt>
          {instanceOfAnomaly(anomaly) && anomaly.description && (
            <Txt block size="small" color="hint" dangerouslySetInnerHTML={{__html: anomaly.description}} />
          )}
          {(anomaly as Subcategory).reponseconsoCode && (
            <Txt key={1} size="small" color="hint">
              <b>ReponseConso codes:</b>&nbsp;
              {(anomaly as Subcategory).reponseconsoCode?.join(', ')}
            </Txt>
          )}
          <Box>
            {(anomaly as Subcategory).tags?.map(tag => (
              <Box
                sx={{
                  mr: 1,
                  borderRadius: 100,
                  height: 26,
                  px: 1.5,
                  backgroundColor: t => t.palette.action.disabledBackground,
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontSize: styleUtils(theme).fontSize.small,
                  // fontWeight: t => t.typography.fontWeightBold,
                  color: t => t.palette.text.secondary,
                }}
                key={tag}
              >
                {tag}
              </Box>
            ))}
          </Box>
          {instanceOfSubcategoryWithInfoWall(anomaly) && <NodeInfo anomaly={anomaly} />}
          {instanceOfSubcategoryWithInputs(anomaly) && <NodeInput anomaly={anomaly} />}
        </Box>
        {isOpen && anomaly.subcategories && (
          <Box
            sx={{
              my: 1,
              position: 'relative',
              '&:before': {
                content: "' '",
                height: '100%',
                width: '1px',
                position: 'absolute',
                background: t => t.palette.divider,
                left: -iconWidth / 2 - iconMargin,
                // borderLeft: t => `1px solid ${t.palette.divider}`
              },
            }}
          >
            {anomaly.subcategories.map(s => (
              <Node open={open} key={s.id} anomaly={s} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  )
}

const NodeInput = ({anomaly}: {anomaly: StandardSubcategory}) => {
  return (
    <>
      {anomaly.detailInputs?.map(input => (
        <Box key={input.label}>
          <Txt block sx={{mt: 1}} size="small" color="hint" dangerouslySetInnerHTML={{__html: input.label}} />
          {fnSwitch(
            input.type,
            {
              [DetailInputType.RADIO]: () => (
                <>
                  {getOptionsFromInput(input)!.map(option => (
                    <Box key={option} sx={{display: 'flex', alignItems: 'center'}}>
                      <Radio disabled size="small" sx={{mr: 1, p: 1 / 4}} />
                      <Txt size="small">{option}</Txt>
                    </Box>
                  ))}
                </>
              ),
              [DetailInputType.CHECKBOX]: () => (
                <>
                  {getOptionsFromInput(input)!.map(option => (
                    <Box key={option} sx={{display: 'flex', alignItems: 'center'}}>
                      <Checkbox disabled size="small" sx={{mr: 1, p: 1 / 4}} />
                      <Txt size="small">{option}</Txt>
                    </Box>
                  ))}
                </>
              ),
            },
            () => (
              <Box
                sx={{
                  px: 1,
                  color: t => t.palette.text.disabled,
                  borderRadius: 4,
                  height: 32,
                  width: 200,
                  border: t => `1px solid ${t.palette.divider}`,
                }}
              >
                {getPlaceholderFromInput(input) ?? '...'}
              </Box>
            ),
          )}
        </Box>
      ))}
    </>
  )
}

const NodeInfo = ({anomaly}: {anomaly: SubcategoryWithInfoWall}) => {
  const {m} = useI18n()
  return (
    <>
      {anomaly.blockingInfo.title && <div dangerouslySetInnerHTML={{__html: anomaly.blockingInfo.title}} />}
      {anomaly.blockingInfo.subTitle && <div dangerouslySetInnerHTML={{__html: anomaly.blockingInfo.subTitle}} />}
      {anomaly.blockingInfo.content && (
        <Txt color="hint" size="small" dangerouslySetInnerHTML={{__html: anomaly.blockingInfo.content}} />
      )}
      {anomaly.blockingInfo.questions && (
        <Txt color="hint" size="small">
          <ul>
            {anomaly.blockingInfo.questions.map(action => (
              <li key={action.question}>
                <Txt bold dangerouslySetInnerHTML={{__html: action.question}} />
                {action.desc && <div dangerouslySetInnerHTML={{__html: action.desc}} />}
                <div dangerouslySetInnerHTML={{__html: action.answer}} />
              </li>
            ))}
          </ul>
        </Txt>
      )}
      {anomaly.blockingInfo.notAFraudMessage && (
        <Txt color="hint" size="small">
          {m.arbo.notAFraudMessage}
        </Txt>
      )}
    </>
  )
}

const Arbo = () => {
  const [openAll, setOpenAll] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const {m, currentLang} = useI18n()
  const anomalies = allVisibleAnomalies(currentLang)
  return (
    <ContentPageContainer>
      <h1>{m.arbo.title}</h1>
      <Button
        className="mb-4"
        disabled={disabled}
        onClick={() => {
          setDisabled(true)
          setTimeout(() => {
            setOpenAll(_ => !_)
          }, 1)
          setTimeout(() => {
            setDisabled(false)
          }, 100)
        }}
      >
        {m.arbo.expandAll}
      </Button>

      {anomalies.map(a => (
        <Node key={a.id} anomaly={a} open={openAll} />
      ))}
    </ContentPageContainer>
  )
}

export default Arbo
