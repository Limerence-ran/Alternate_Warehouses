export const actions = {
    btnChange: (state) => {
        state.btnopen = !state.btnopen;
    },
    areaChange: (state, action) => {
        state.area = action.payload;
    },
};
