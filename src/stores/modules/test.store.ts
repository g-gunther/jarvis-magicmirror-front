import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';

export interface ITestStoreState {
    counter: number;
}

@Module({
    namespaced: true,
})
export default class TestStore extends VuexModule implements ITestStoreState {
    public counter: number = 10;

    @Mutation
    public updateCounter(value: number) {
        this.counter += value;
    }

    @Action({ commit: 'updateCounter' })
    public increment() {
        return 1;
    }
}
