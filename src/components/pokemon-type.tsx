import React, { FunctionComponent } from 'react';
import { PokemonType } from '../types/types';
import { formatType } from '../helpers/format-type';

interface Props {
    type: PokemonType
}

const TypeTag: FunctionComponent<Props> = ({ type }) => {
    return (
        <span
            className={`inline-block text-center px-2 py-1 text-xs font-semibold text-white rounded-full mr-1 mt-1 w-16 ${formatType(
                type
            )}`}
        >
            {type}
        </span>
    );
};

export default TypeTag;