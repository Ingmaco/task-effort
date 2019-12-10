import { eventCodes } from '../config/main'
import { baseStimulus } from '../lib/markup/stimuli'
import { photodiodeGhostBox, pdSpotEncode } from '../lib/markup/photodiode'

const rewardProbability = (duration, probability) => {
  const code = eventCodes.rewardProbability
  return {
    type: 'html_keyboard_response',
    stimulus: '',
    // prompt:  lang.prompt.continue.press,
    response_ends_trial: false,
    trial_duration: duration,
    on_start: (trial) => {
      trial.stimulus = baseStimulus(`<h1>${probability}</h1>`, true) +
      photodiodeGhostBox()
    },
    on_load: () => pdSpotEncode(code),
    on_finish: (data) => data.code = code
  }
}

export default rewardProbability
