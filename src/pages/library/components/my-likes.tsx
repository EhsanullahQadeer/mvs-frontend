/*************************************************************************
 * @file my-likes.tsx
 * @author Karla Zamora
 * @desc Page component for displaying user's liked items.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* LOCAL IMPORTS */
import SampleTable from "components/SampleContainer/components/table";
import { popBreadcrumb, setBreadcrumbs } from "redux/actions/breadcrumb.actions";
import { WaveformProvider } from "components/SampleContainer/components/waveform/context";
import { getLikedSamplesAPI } from "api/sounds";
import Pagination from "components/SampleContainer/components/pagination";

/* THIRD PARTY IMPORTS */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AudioTrackType } from "components/SampleContainer/player-container";

const MyLikesPage = () => {
  const dispatch = useDispatch();
  const [samples, setSamples] = useState<AudioTrackType[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const samplesPerPage = 10;

  const fetchLikedSamples = async (page: number) => {
    try {
      const response = await getLikedSamplesAPI({
        skip: page,
        take: samplesPerPage,
      });

      if (response?.data?.results) {
        const transformedSamples = response.data.results.items.map(item => ({
          id: item.id,
          audio_url: item.s3_key,
          title: item.filename || 'Untitled',
          artists: [],
          length: item.length,
          thumbnail: item.thumbnail,
          bpm: item.bpm,
          key: item.key,
          s3_key: item.s3_key,
          filename: item.filename,
          userInfo: {
            isLiked: true,
            isDownloaded: item.userInfo?.isDownloaded,
            isOwner: item.userInfo?.isOwner
          }
        }));

        setSamples(transformedSamples);
        setTotalCount(response.data.results.pagination.total);
      }
    } catch (error) {
      console.error('Error fetching liked samples:', error);
      setSamples([]);
      setTotalCount(0);
    }
  };

  const handlePageClick = async (event: { selected: number }) => {
    const selectedPage = event.selected;
    setCurrentPage(selectedPage);
    await fetchLikedSamples(selectedPage);
  };

  useEffect(() => {
    fetchLikedSamples(0);
    
    dispatch(
      setBreadcrumbs([
        { name: "Library", path: "/library" },
        { name: "My Likes", path: "/library/my/likes" },
      ])
    );
    
    return () => {
      dispatch(popBreadcrumb());
    };
  }, [dispatch]);

  return (
    <WaveformProvider>
      <div className="text-xs font-medium text-[#9C9C9C] py-4 px-3 border-t border-[#1F1F1F]">
        <p className="text-[20px] text-white pt-[10px] pb-[10px] leading-[20px] font-['Mona-Sans-M']">Liked Samples</p>
        {totalCount} results
      </div>
      <SampleTable samples={samples} />
      {totalCount > 0 && (
        <Pagination
          pageCount={Math.ceil(totalCount / samplesPerPage)}
          onPageChange={handlePageClick}
          currentPage={currentPage}
        />
      )}
    </WaveformProvider>
  );
};

export default MyLikesPage;
