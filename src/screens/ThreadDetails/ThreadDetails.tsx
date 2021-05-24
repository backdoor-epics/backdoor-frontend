import { routeVariants } from '../../variants/index';
import { fetchThread, fetchPostsBySearch } from '../../api/index';
import { IThread, IPost } from '../../api/modelsInterface';
import Sidebar from '../../components/Utilities/Sidebar';
import Navbar from '../../components/Navbars/Navbar';
import PostCard from '../../components/Cards/PostCard/PostCard';
import PostIllustration from '../../assets/post-illustration.svg';
import { motion } from 'framer-motion';
import { toast, Flip } from 'react-toastify';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface RouteParams {
    threadName: string;
}

const ThreadDetails: React.FC = () => {
    const [posts, setPosts] = useState<Array<IPost>>();
    const [threadData, setThreadData] = useState<IThread>();
    const { threadName } = useParams<RouteParams>();

    // Fetch data for this thread
    useEffect(() => {
        fetchThread(threadName)
            .then(res => {
                setThreadData(res.data);
            })
            .catch(err => {
                toast.error(err.response.data.message, { transition: Flip });
            });
    }, [threadName]);

    // Get posts belonging to this particular thread.
    useEffect(() => {
        fetchPostsBySearch('', threadName)
            .then(res => {
                setPosts(res.data);
            })
            .catch(err => {
                toast.error(err.response.data.message, { transition: Flip });
            });
    }, [threadName]);

    return (
        <motion.div
            variants={routeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <Navbar />
            <section className="flex flex-wrap w-screen h-screen box-border overflow-x-hidden scrollbar">
                <Sidebar
                    bgColor="yellow"
                    title={threadName}
                    description={threadData?.body}
                    titleColor="grey-darker"
                    descriptionColor="grey-lighter"
                    illustration={PostIllustration}
                />
                <div className="flex flex-1 flex-col items-center flex-wrap mt-8 mb-20 mx-2 box-border">
                    {posts?.map(post => {
                        return (
                            <PostCard
                                id={post._id}
                                title={post.title}
                                body={post.body}
                                votes={post.votes}
                                downVotes={post.downVotes}
                                key={post._id}
                            />
                        );
                    })}
                </div>
            </section>
        </motion.div>
    );
}

export default ThreadDetails;