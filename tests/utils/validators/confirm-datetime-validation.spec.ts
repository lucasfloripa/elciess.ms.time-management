import { ConfirmDateTimeValidation } from '../../../src/utils/validators'
import { InvalidParamError } from '../../../src/presentation/errors'

const makeSut = (): ConfirmDateTimeValidation => {
  return new ConfirmDateTimeValidation()
}

describe('ConfirmDateTimeValidation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ started_at: '2011-10-05T14:48:00.000Z', ended_at: '2011-10-05T14:47:00.000Z' })
    expect(error).toEqual(new InvalidParamError('started_at greater than ended_at'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ started_at: '2011-10-05T14:48:00.000Z', ended_at: '2011-10-05T14:49:00.000Z' })
    expect(error).toBeFalsy()
  })
})
