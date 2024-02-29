import { init, RematchRootState, RematchDispatch, Models } from "@rematch/core";
import loadingPlugin, { ExtraModelsFromLoading } from "@rematch/loading";
import list from "./list";

export const models: RootModel = { list };

export const store = init<RootModel, FullModel>({
  models,
  plugins: [loadingPlugin({ type: "full" })],
});

export type RootState = RematchRootState<RootModel, FullModel>;
export type RootDispatch = RematchDispatch<typeof models>;
export type FullModel = ExtraModelsFromLoading<RootModel, { type: "full" }>;
export interface RootModel extends Models<RootModel> {
  list: typeof list;
}
