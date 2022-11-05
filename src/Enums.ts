export enum QuantityEnum {
  /** Количество в граммах */
  WEIGHT = 'WEIGHT',
  /** Количество в штуках */
  THINGS = 'THINGS',
  /** Чайных ложек */
  TEA_SPOON = 'TEA_SPOON',
  /** Столовых ложек */
  TABLE_SPOON = 'TABLE_SPOON',
  /** Объем в мл */
  VOLUME = 'VOLUME',
}

export const QuantityEnumDescription: Record<QuantityEnum, string> = {
  [QuantityEnum.WEIGHT]: 'грамм',
  [QuantityEnum.THINGS]: 'штук',
  [QuantityEnum.TEA_SPOON]: 'ч.\u00A0лжк',
  [QuantityEnum.TABLE_SPOON]: 'стл.\u00A0лжк',
  [QuantityEnum.VOLUME]: 'мл',
};
