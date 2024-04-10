import { configureStore } from '@reduxjs/toolkit'
import sliceCounter from '../slice/sliceCounter';

export const store = configureStore({

    reducer: {
        //方法和state
        counter: sliceCounter
    }

});