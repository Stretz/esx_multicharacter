import React from 'react';
import { Character } from '../types/Character';
import { Icon } from '@iconify/react';

interface CharacterCardProps {
  character: Character;
  onSelect: (id: string) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ 
  character, 
  onSelect
}) => {
  return (
    <button
      type="button"
      onClick={() => onSelect(character.id)}
      className={[
        'mc-listItem w-full text-left',
        character.isActive ? 'mc-listItem--active' : 'mc-listItem--idle',
        character.disabled ? 'opacity-70' : '',
      ].join(' ')}
    >
      <div className="flex items-center gap-3">
        <div className={['mc-avatar', character.isActive ? 'mc-avatar--active' : ''].join(' ')}>
          <Icon icon="material-symbols:person-rounded" width="18" height="18" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="mc-name truncate">{character.name}</div>
              <div className="mc-sub truncate">{character.occupation || 'Unemployed'}</div>
            </div>
            <div className="mc-chevron" aria-hidden>
              →
            </div>
          </div>
        </div>
      </div>

      <div className="mc-divider" />
    </button>
  )
};

export default CharacterCard;
