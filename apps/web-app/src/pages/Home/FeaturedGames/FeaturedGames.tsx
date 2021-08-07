import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_GAMES } from 'src/graphql/queries';
import Carousel, { CarouselItem } from 'src/components/Carousel';
import { GamesQueryResponse } from '@game-store-monorepo/data-access';
import { getMultipleGenreNames } from '@game-store-monorepo/util';
import PlatformLogos from 'src/components/PlatformLogos';

const FeaturedGames: React.FC = () => {
  const { push } = useHistory();
  const { data } = useQuery<GamesQueryResponse>(GET_GAMES, {
    variables: {
      pageSize: 5,
      dates: '2020-01-01,2020-12-31',
      ordering: '-added',
    },
  });

  const carouselData: CarouselItem[] = React.useMemo(() => {
    if (!data) {
      return [];
    }
    return data.allGames.map((item): CarouselItem => {
      return {
        id: item.id,
        headerImageUrl: item.backgroundImage,
        title: item.name,
        content: (
          <div>
            <PlatformLogos data={item.parentPlatforms} className="mt-1" />
            <p className="mt-2 text-sm truncate">{`${getMultipleGenreNames(item.genres, 3)}`}</p>
          </div>
        ),
      };
    });
  }, [data]);

  const onItemClick = () => {
    return () => {
      push('/games/123');
    };
  };

  return (
    <Carousel data={carouselData} className="carousel-center mb-6" itemClassName="w-4/5" onItemClick={onItemClick()} />
  );
};

export default FeaturedGames;
