import {apiSlice} from '../apiSlice.ts';
import {allUrls} from '../../../constants/api.ts';
import {IApiRes} from '../../../types/api.ts';

// Region
export  interface Region {
  id: string;
  nomi: string;
}

interface RegionRes extends IApiRes {
  data: Region[];
}

// District
export interface District {
  id: string;
  nomi: string;
  vil_id: string;
}

interface DistrictRes extends IApiRes {
  data: District[];
}

const regionApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    // Region
    getRegion: build.query<RegionRes, void>({
      query: () => allUrls.regionGetAll,
    }),
    // District
    getDistrictByRegion: build.query<DistrictRes, string>({
      query: regionId => allUrls.districtGetByRegion(regionId),
    }),
  }),
});

export const {useGetRegionQuery, useGetDistrictByRegionQuery} = regionApi;
