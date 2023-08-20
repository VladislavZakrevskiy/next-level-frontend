import { AsyncThunkAction } from '@reduxjs/toolkit'
import { StateSchema } from 'app/providers/StoreProvider'
import axios, { AxiosStatic } from 'axios'

jest.mock('axios')

const mockedAxios = jest.mocked(axios)

type ActionCreatorType<Return, Arg, RejectedValue> = (
    arg: Arg
) => AsyncThunkAction<
    Return,
    Arg,
    { rejectValue: RejectedValue }
>

export class TestAsyncThunk<Return, Arg, RejectedValue> {
    dispatch: jest.MockedFn<any>
    getState: () => StateSchema
    actionCreator: ActionCreatorType<
        Return,
        Arg,
        RejectedValue
    >

    api: jest.MockedFunctionDeep<AxiosStatic>
    nav: jest.MockedFn<any>

    constructor(
        actionCreator: ActionCreatorType<
            Return,
            Arg,
            RejectedValue
        >
    ) {
        this.actionCreator = actionCreator
        this.dispatch = jest.fn()
        this.getState = jest.fn()

        this.api = mockedAxios
        this.nav = jest.fn()
    }

    async callThunk(arg: Arg) {
        const action = this.actionCreator(arg)
        const result = await action(
            this.dispatch,
            this.getState,
            {api: this.api, nav: this.nav}
        )

        return result
    }
}
