import {apiSlice} from '../apiSlice.ts';
import {allUrls} from '../../../constants/api.ts';

const regionApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    // Region
    getRegion: build.query({
      query: () => allUrls.regionGetAll,
    }),
    // District
    getDistrictByRegion: build.query<void, string>({
      query: regionId => allUrls.districtGetByRegion(regionId),
    }),
  }),
});

export const {useGetRegionQuery, useGetDistrictByRegionQuery} = regionApi;
