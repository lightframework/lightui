import { cityOptionsApiCmdbCitysOptions } from '@/services/cmdb/city';
import { continentOptionsApiCmdbContinentsOptions } from '@/services/cmdb/continent';
import { countryOptionsApiCmdbCountrysOptions } from '@/services/cmdb/country';
import { ProFormCascader } from '@ant-design/pro-components';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

interface Option {
  value: string;
  label: string;
  children?: Option[];
  isLeaf?: boolean;
  type: 'continent' | 'country' | 'city';
}

export default function CityCascader() {
  const [options, setOptions] = useState<Option[]>([]);

  const { data } = useQuery({
    queryKey: ['continent-options'],
    queryFn: () =>
      continentOptionsApiCmdbContinentsOptions({}).then(
        (res) => res.data?.list ?? [],
      ),
  });

  useEffect(() => {
    if (data) {
      setOptions(
        data.map((continent) => ({
          label: continent.ContinentNameCn,
          value: continent.Uid,
          isLeaf: false,
          type: 'continent',
        })),
      );
    }
  }, [data]);

  const loadData = async (selectedOptions: Option[]) => {
    const promises: Promise<void>[] = [];

    for (const option of selectedOptions) {
      if (option.type === 'continent') {
        const promise = countryOptionsApiCmdbCountrysOptions({
          ContinentUid: option.value,
        }).then((res) => {
          option.children = res.data?.list?.map((country) => ({
            label: country.CountryNameCn,
            value: country.Uid,
            isLeaf: false,
            type: 'country',
          }));
        });
        promises.push(promise);
      } else if (option.type === 'country') {
        const promise = cityOptionsApiCmdbCitysOptions({
          CountryUid: option.value,
        }).then((res) => {
          option.children = res.data?.list?.map((city) => ({
            label: city.CityNameCn,
            value: city.Uid,
            isLeaf: true,
            type: 'city',
          }));
        });
        promises.push(promise);
      }
    }

    await Promise.all(promises);

    setOptions([...options]);
  };

  return (
    <ProFormCascader
      name="CityUid"
      label="城市"
      fieldProps={{ options, loadData }}
      placeholder=""
      transform={(value) => (Array.isArray(value) ? value.at(2) : value)}
    />
  );
}
