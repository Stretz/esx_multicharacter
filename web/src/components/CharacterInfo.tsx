import React from 'react';
import { Character, Locale } from '../types/Character';

interface CharacterInfoProps {
  character: Character | null;
  isAllowedtoDelete: boolean;
  PlayCharacter : () => void;
  handleDelete: () => void;
  locale: Locale;
}

const CharacterInfo: React.FC<CharacterInfoProps> = ({ character, isAllowedtoDelete , PlayCharacter, handleDelete, locale}) => {
  if (!character) {
    return (
      <div className="h-full flex flex-col">
        <div className="mc-titleSmall">CHARACTER INFO</div>
        <div className="mt-6 text-white/60 text-sm leading-relaxed">
          Select a character to view details.
        </div>
      </div>
    );
  }

  const genderLabel =
    (character.gender ?? '').toString().toLowerCase() === 'female' ? 'Female' : 'Male';

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mc-titleSmall">{(locale?.char_info_title ?? 'CHARACTER INFO').trim() || 'CHARACTER INFO'}</div>
          <div className="mt-2 mc-nameBig">{character.name}</div>
          <div className="mt-1 mc-sub">{character.birthDate}</div>
        </div>

        <div className="mc-badge">{genderLabel}</div>
      </div>

      <div className="mt-8 grid gap-3">
        <div className="mc-statRow">
          <span className="mc-statLabel">Occupation</span>
          <span className="mc-statValue truncate">{character.occupation || 'Unemployed'}</span>
        </div>
        <div className="mc-statRow">
          <span className="mc-statLabel">Status</span>
          <span className="mc-statValue">{character.disabled ? 'Unavailable' : 'Ready'}</span>
        </div>
      </div>

      <div className="mt-auto pt-8">
        <div className="flex gap-2">
          <button
            className={`mc-secondaryBtn flex-1 ${character.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={PlayCharacter}
            disabled={character.disabled}
          >
            {(locale?.play ?? 'PLAY').trim() || 'PLAY'}
          </button>
          {isAllowedtoDelete && (
            <button
              className="mc-secondaryBtn mc-secondaryBtn--danger"
              onClick={handleDelete}
              title="Delete character"
            >
              DELETE
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterInfo;