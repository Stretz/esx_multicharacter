import React, { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { Character, Locale } from '../types/Character';
import CharacterCard from './CharacterCard';
import CharacterInfo from './CharacterInfo';
import { fetchNui } from '../utils/fetchNui';

interface CharacterSelectionProps {
  initialCharacters: Character[];
  Candelete: boolean;
  MaxAllowedSlot : number;
  locale : Locale;
}

const CharacterSelection: React.FC<CharacterSelectionProps> = ({ initialCharacters, Candelete, MaxAllowedSlot, locale }) => {
  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    characters.find(char => char.isActive) || null
  );

  const slotsUsed = characters.length;
  const canCreate = slotsUsed < MaxAllowedSlot;

  const heading = useMemo(() => {
    const raw = (locale?.title ?? '').trim();
    return raw.length ? raw : 'SELECT A CHARACTER';
  }, [locale?.title]);

  const handleSelectCharacter = (id: string) => {
    if (selectedCharacter?.id === id) return;

    const updatedCharacters = characters.map(char => ({
      ...char,
      isActive: char.id === id
    }));
    
    setCharacters(updatedCharacters);
    setSelectedCharacter(updatedCharacters.find(char => char.id === id) || null);
    fetchNui('SelectCharacter', {id : id})
  };

  const PlayCharacter = () => {
    fetchNui('PlayCharacter')
  }

  const handleCreateCharacter = () => {
    fetchNui('CreateCharacter')
  }

  const handleDeleteCharacter = () => {
    if (!selectedCharacter) return;

    const updatedCharactersRaw = characters.filter(char => char.id !== selectedCharacter.id);

    fetchNui('DeleteCharacter');

    if (updatedCharactersRaw.length > 0) {
      const updatedCharacters = updatedCharactersRaw.map((char, index) => ({
        ...char,
        isActive: index === 0
      }));

      setCharacters(updatedCharacters);
      setSelectedCharacter(updatedCharacters[0]);
    } else {
      setCharacters([]);
      setSelectedCharacter(null);
      handleCreateCharacter();
    }
  };

  return (
    <div className="relative h-screen w-screen text-white overflow-hidden">
      <div className="absolute inset-0 mc-backdrop" />

      <div className="absolute inset-x-0 top-0 h-40 mc-vignette pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-56 mc-vignetteBottom pointer-events-none" />

      <div className="relative z-10 grid h-full w-full grid-cols-[360px_1fr_360px]">
        <aside className="h-full px-10 py-10">
          <div className="mc-panel h-full flex flex-col">
            <div className="flex items-start justify-between gap-6">
              <div className="flex flex-col">
                <div className="mc-kicker">MULTICHARACTER</div>
                <div className="mc-title">{heading}</div>
              </div>
              <div className="text-right text-xs text-white/60">
                <div className="mc-mono">{slotsUsed}/{MaxAllowedSlot}</div>
                <div className="mt-1">Slots</div>
              </div>
            </div>

            <div className="mt-8 flex-1 overflow-auto pr-2 mc-scroll">
              <div className="space-y-3">
                {characters.map((character) => (
                  <CharacterCard
                    key={character.id}
                    character={character}
                    onSelect={handleSelectCharacter}
                  />
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <button
                className={`mc-createBtn ${canCreate ? 'mc-createBtn--active' : 'mc-createBtn--disabled'}`}
                onClick={handleCreateCharacter}
                disabled={!canCreate}
              >
                <Plus size={18} />
                <span>Create Character</span>
              </button>
            </div>
          </div>
        </aside>

        <main className="relative h-full">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="mc-centerGlow" />
          </div>

          <div className="absolute inset-x-0 bottom-10 flex items-center justify-center gap-3">
            <button
              className={`mc-actionBtn mc-actionBtn--play ${selectedCharacter?.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={PlayCharacter}
              disabled={selectedCharacter?.disabled}
            >
              <span className="mc-actionIcon">▶</span>
              <span>{(locale?.play ?? 'PLAY').trim() || 'PLAY'}</span>
            </button>

            {Candelete && (
              <button
                className="mc-actionBtn mc-actionBtn--danger"
                onClick={handleDeleteCharacter}
                disabled={!selectedCharacter}
              >
                <span className="mc-actionIcon">🗑</span>
                <span>DELETE</span>
              </button>
            )}
          </div>
        </main>

        <aside className="h-full px-10 py-10">
          <div className="mc-panel h-full">
            <CharacterInfo
              character={selectedCharacter}
              isAllowedtoDelete={Candelete}
              PlayCharacter={PlayCharacter}
              handleDelete={handleDeleteCharacter}
              locale={locale}
            />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CharacterSelection;