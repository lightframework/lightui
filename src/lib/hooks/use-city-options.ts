import { continentPlacementThreeApiCmdbContinentsPlacesthree } from '@/services/cmdb/continent';
import { useQuery } from '@tanstack/react-query';

export default function useCityOptions(config?: { valueById?: boolean }) {
  const { data } = useQuery({
    queryKey: ['city-cascader'],
    queryFn: () => continentPlacementThreeApiCmdbContinentsPlacesthree({}),
  });

  const options = data?.data?.Tree?.map((continent) => ({
    label: continent.ContinentNameCn,
    value: config?.valueById ? continent.ContinentId : continent.Uid,
    disabled: !continent.CountrySet || continent.CountrySet.length === 0,
    children: continent.CountrySet?.map((country) => ({
      label: country.CountryNameCn,
      value: config?.valueById ? country.CountryId : country.Uid,
      disabled: !country.CitySet || country.CitySet.length === 0,
      children: country.CitySet?.map((city) => ({
        label: city.CityNameCn,
        value: config?.valueById ? city.CityId : city.Uid,
      })),
    })),
  }));

  console.log(options);

  return options;
}
