/*************************************************************************
 * @file downloaded-samples.tsx
 * @author Karla Zamora
 * @desc Page component for displaying user's downloaded items.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* LOCAL IMPORTS */
import SampleTable from "components/SampleContainer/components/table";
import { popBreadcrumb, setBreadcrumbs } from "redux/actions/breadcrumb.actions";
import { WaveformProvider } from "components/SampleContainer/components/waveform/context";
import { getDownloadedSamplesAPI, getLikedSamplesAPI, getUserDownloadsAPI } from "api/sounds";
import Pagination from "components/SampleContainer/components/pagination";

/* THIRD PARTY IMPORTS */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AudioTrackType } from "components/SampleContainer/player-container";

const MyDownloadsPage = () => {
  const dispatch = useDispatch();
  const [samples, setSamples] = useState<AudioTrackType[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const samplesPerPage = 10; // Match the backend pagination size
  const [likedSamples, setLikedSamples] = useState<Record<number, boolean>>({});

  console.log('samplesasd;lkjfaslkf');

  const fetchUserDownloads = async (page: number) => {
    try {
      console.log('Fetching downloads for page:', page);
      const response = await getUserDownloadsAPI({
        skip: page,
        take: samplesPerPage,
      });
      console.log('Downloads API response:', response);
      
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
            isLiked: item.userInfo?.isLiked || false,
            isDownloaded: item.userInfo?.isDownloaded,
            isOwner: item.userInfo?.isOwner
          }
        }));

        console.log('Transformed samples:', transformedSamples);
        setSamples(transformedSamples);
        setTotalCount(response.data.results.pagination.total);
      }
    } catch (error) {
      console.error('Error fetching downloaded samples:', error);
    }
  };

  const handlePageClick = async (event: { selected: number }) => {
    const selectedPage = event.selected;
    setCurrentPage(selectedPage);
    await fetchUserDownloads(selectedPage);
  };

  useEffect(() => {
    fetchUserDownloads(0);
    
    dispatch(
      setBreadcrumbs([
        { name: "Library", path: "/library" },
        { name: "My Downloads", path: "/library/my/downloads" },
      ])
    );
    
    return () => {
      dispatch(popBreadcrumb());
    };
  }, [dispatch]);

  return (
    <WaveformProvider>
      <div className="text-xs font-medium text-[#9C9C9C] py-4 px-3 border-t border-[#1F1F1F]">
        <p className="text-[20px] text-white pt-[10px] pb-[10px] leading-[20px] font-['Mona-Sans-M']">Samples</p>
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

export default MyDownloadsPage;
