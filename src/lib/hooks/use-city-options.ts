import { continentPlacementThreeApiCmdbContinentsPlacesthree } from '@/services/cmdb/continent';
import { useQuery } from '@tanstack/react-query';

export default function useCityOptions() {
  const { data } = useQuery({
    queryKey: ['city-cascader'],
    queryFn: () => continentPlacementThreeApiCmdbContinentsPlacesthree({}),
  });

  const options = data?.data?.Tree?.map((continent) => ({
    label: continent.ContinentNameCn,
    value: continent.Uid,
    disabled: !continent.CountrySet || continent.CountrySet.length === 0,
    children: continent.CountrySet?.map((country) => ({
      label: country.CountryNameCn,
      value: country.Uid,
      disabled: !country.CitySet || country.CitySet.length === 0,
      children: country.CitySet?.map((city) => ({
        label: city.CityNameCn,
        value: city.Uid,
      })),
    })),
  }));

  console.log(options);

  return options;
}
