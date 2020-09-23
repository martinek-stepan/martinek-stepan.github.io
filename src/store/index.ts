import { Project } from '@/helpers/interfaces';
import {
  createStore,
  MutationTree,
  ActionContext,
  ActionTree,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
  createLogger
} from "vuex";

export enum LoadingState
{
  LOADING = "LOADING",
  LOADED = "LOADED",
  ERROR = "ERROR"
}

//declare state
export type State = { 
  selectedTechnologies: Array<string>;
  projects: Array<Project>;
  loadingState: LoadingState;
  loadingError?: string;
 };

//set state
const state: State = { 
  selectedTechnologies: [],
  loadingState: LoadingState.LOADING,
  projects: []
 };

// mutations and action enums

export enum MutationTypes {
  SELECT_TECHNOLOGY = "SELECT_TECHNOLOGY",
  DESELECT_TECHNOLOGY = "DESELECT_TECHNOLOGY",
  SET_TECHNOLOGY = "SET_TECHNOLOGY",
  SET_LOADING = "SET_LOADING",
  SET_PROJECTS = "SET_PROJECTS",
  SET_LOADING_ERROR = "SET_LOADING_ERROR"
}


export enum ActionTypes {
  LOAD_PROJECTS = "LOAD_PROJECTS"
}

//Mutation Types
export type Mutations<S = State> = {
  [MutationTypes.SELECT_TECHNOLOGY](state: S, payload: string): void;
  [MutationTypes.DESELECT_TECHNOLOGY](state: S, payload: string): void;
  [MutationTypes.SET_TECHNOLOGY](state: S, payload: Array<string>): void;
  [MutationTypes.SET_PROJECTS](state: S, payload: Array<Project>): void;
  [MutationTypes.SET_LOADING](state: S, payload: LoadingState): void;
  [MutationTypes.SET_LOADING_ERROR](state: S, payload: string): void;
};

//define mutations
const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SELECT_TECHNOLOGY](state: State, payload: string) {
    const index = state.selectedTechnologies.indexOf(payload);
    if (index === -1) {
      state.selectedTechnologies.push(payload);
    }
  },
  [MutationTypes.DESELECT_TECHNOLOGY](state: State, payload: string) {
    const index = state.selectedTechnologies.indexOf(payload);
    if (index !== -1) {
      state.selectedTechnologies.splice(index, 1);
    }
  },
  [MutationTypes.SET_TECHNOLOGY](state: State, payload: Array<string>) {
    state.selectedTechnologies = Array.from(payload);
  },
  [MutationTypes.SET_LOADING](state: State, payload: LoadingState) {
    state.loadingState = payload;
  },
  [MutationTypes.SET_PROJECTS](state: State, payload: Array<Project>){
      payload.sort(function (a: Project, b: Project) {
        const aParts = a.date.split("/");
        const bParts = b.date.split("/");
        if (aParts[1] > bParts[1]) {
            return -1;
        } else if (aParts[1] < bParts[1]) {
            return 1;
        } else if (aParts[0] > bParts[0]) {
            return -1;
        } else if (aParts[0] < bParts[0]) {
            return 1;
        } else {
            return 0;
        }
    });
    state.projects = payload;
  },
  [MutationTypes.SET_LOADING_ERROR](state: State, payload: string)
  {
    state.loadingError = payload;
  }
};

//actions

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, "commit">;

// actions interface

export interface Actions {
  [ActionTypes.LOAD_PROJECTS](
    { commit }: AugmentedActionContext
  ): void;
}

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.LOAD_PROJECTS]({ commit }) {
    commit(MutationTypes.SET_LOADING, LoadingState.LOADING);   

    try
    {
      const res = await fetch("/json/projects.json");
      if (!res.ok) {
        commit(MutationTypes.SET_LOADING_ERROR, res.statusText);
        commit(MutationTypes.SET_LOADING, LoadingState.ERROR);
        return;
      }
  
      const projects = await res.json() as Array<Project>;
  
      commit(MutationTypes.SET_PROJECTS, projects);
      commit(MutationTypes.SET_LOADING, LoadingState.LOADED);
    }
    catch(ex)
    {      
      commit(MutationTypes.SET_LOADING_ERROR, (ex as Error).message);
      commit(MutationTypes.SET_LOADING, LoadingState.ERROR);
    }
  }
};


//setup store type
export type Store = Omit<
  VuexStore<State>,
  "commit" | "dispatch"
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
}  & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
};

export const store = createStore({
  state,
  mutations,
  actions,
  plugins: [createLogger()]
});

export function useStore() {
  return store as Store;
}