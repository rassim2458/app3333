import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import LoadingSpinner from "../../components/common/LoadingSpinner";
import RightPanel from "../../components/common/RightPanel";
import { ProfileCard } from "../../components/common/ProfileCard ";


import { IoSettingsOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

const NotificationPage = () => {
	const queryClient = useQueryClient();
	const { data: notifications, isLoading } = useQuery({
		queryKey: ["notifications"],
		queryFn: async () => {
			try {
				const res = await fetch("/api/notifications");
				const data = await res.json();
				if (!res.ok) throw new Error(data.error || "Something went wrong");
				return data;
			} catch (error) {
				throw new Error(error);
			}
		},
	});

	const { mutate: deleteNotifications } = useMutation({
		mutationFn: async () => {
			try {
				const res = await fetch("/api/notifications", {
					method: "DELETE",
				});
				const data = await res.json();

				if (!res.ok) throw new Error(data.error || "Something went wrong");
				return data;
			} catch (error) {
				throw new Error(error);
			}
		},
		onSuccess: () => {
			toast.success("Notifications deleted successfully");
			queryClient.invalidateQueries({ queryKey: ["notifications"] });
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return (
		<>
			<div className='flex-[4_4_0]    rounded-lg '>
				<div className='flex justify-between bg-slate-600 rounded-t-xl items-center p-4 '>
					<p className='font-bold'>Notifications</p>
					<div className='dropdown '>
						<div tabIndex={0} role='button' className='m-1'>
							<IoSettingsOutline className='w-4' />
						</div>
						<ul
							tabIndex={0}
							className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'
						>
							<li>
								<a onClick={deleteNotifications}>Delete all notifications</a>
							</li>
						</ul>
					</div>
				</div>
				{isLoading && (
					<div className='flex justify-center h-full items-center'>
						<LoadingSpinner size='lg' />
					</div>
				)}
				<div className="  overflow-y-auto h-[calc(100vh-120)]">
					{notifications?.length === 0 && <div className='text-center my-7 p-4 font-bold'>No notifications 🤔</div>}
					{notifications?.map((notification) => (
						<div className=' shadow-lg border-gray-700' key={notification._id}>
							<div className='flex gap-2 p-4'>
								{notification.type === "follow" && <FaUser className='w-7 h-7 text-primary' />}
								{notification.type === "like" && <FaHeart className='w-7 h-7 text-red-500' />}
								<Link to={`/profile/${notification.from.username}`}>
									<div className='avatar'>
										<div className='w-8 rounded-full'>
											<img src={notification.from.profileImg || "/avatar-placeholder.png"} />
										</div>
									</div>
									<div className='flex gap-1'>
										<span className='font-bold'>@{notification.from.username}</span>{" "}
										{notification.type === "follow" ? "followed you" : "liked your post"}
									</div>
								</Link>
							</div>
						</div>
					))}
				</div>
				
			</div><div className=""style={{ height: '200px' }}>
			<ProfileCard
				imageSrc="/avatar-placeholder.png"
				username="issam"
				email="issam@example.com"
				description="web app dev ..."
			/>  
			 <RightPanel />  
			</div>
		</>
	);
};
export default NotificationPage;