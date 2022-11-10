import React from 'react';
import config from '../config.json'
import styled from 'styled-components'
import { CSSReset } from '../src/components/CSSReset';
import Menu from '../src/components/Menu';
import { StyledTimeline } from '../src/components/Timeline';

export default function Home() {
  const [valorDoFiltro, setValorDoFiltro] = React.useState('');

  return (
    <>
      <CSSReset />
      <div 
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
        <Header />
        <Timeline searchValue={valorDoFiltro} playlists={config.playlists}>
          Conteúdo
        </Timeline>
      </div>
    </>
  )
}

const StyledHeader = styled.div`
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }

  .user-infor {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`

const StyledBanner = styled.div`
  background-image: url(${({ bg }) => bg});
  /* background-image: url(${config.bg}) */
  height: 230px;
  width: 100%;
`;

function Header() {
  return (
    <StyledHeader>
      <StyledBanner bg={config.bg} />
      
      <section className="user-infor">
        <img src={`https://github.com/${config.github}.png`} />

        <div>
          <h2>{config.name}</h2>
          <p>
            {config.job}
          </p>
        </div>
      </section>
    </StyledHeader>
  )
}

function Timeline({searchValue, ...props}) {
  const playlistNames = Object.keys(props.playlists);

  return (
    <StyledTimeline>
      {playlistNames.map((playlistName) => {
        const videos = props.playlists[playlistName]

        return (
          <section key={playlistName}>
              <h2>{playlistName}</h2>
              <div>
                {videos
                  .filter((video) => {
                      const titleNormalized = video.title.toLowerCase();
                      const searchValueNormalized = searchValue.toLowerCase();
                      return titleNormalized.includes(searchValueNormalized)
                  })
                  .map((video) => {
                      return (
                          <a key={video.url} href={video.url}>
                              <img src={video.thumb} />
                              <span>
                                  {video.title}
                              </span>
                          </a>
                      )
                })}
              </div>
          </section>
        )
      })}
    </StyledTimeline>
  )
}