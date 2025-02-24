"use client";

import { EXPLORER } from "@/contants";

import { useRef } from "react";

import { useRouter } from "next/navigation";

export const ExplorerDrawer = () => {
  const ref = useRef<any>(null);
  const router = useRouter();

  const onToggle = () => {
    ref?.current?.onToggle();
  };

  // const Content = () => {
  //   return (
  //     <>
  //       <div className="bg-black-2 flex items-center gap-2 rounded-tl-[0.625rem] rounded-tr-[0.625rem] px-4 py-3">
  //         <Tooltips
  //           childrenContent={
  //             <>
  //               <span className="text-white-0 text-center font-medium leading-6">
  //                 Green Net Network
  //               </span>
  //               <span className="text-white-0 text-center font-medium leading-6">
  //                 Operation Status
  //               </span>
  //               <div className="flex flex-row items-center justify-center gap-1.5">
  //                 {/* <SmallDot /> */}
  //                 <div className="text-white-0 font-medium leading-6">
  //                   Online
  //                 </div>
  //               </div>
  //             </>
  //           }
  //         >
  //           <div className="flex flex-row items-center justify-center gap-1.5">
  //             {/* <SmallDot /> */}
  //             <div className="text-white-0 font-medium leading-6">
  //               Green Net
  //             </div>
  //           </div>
  //         </Tooltips>
  //       </div>
  //       <Button
  //         variant="secondaryWhite"
  //         size="medium"
  //         title="Block Explorer"
  //         onClick={(e) => {
  //           e.preventDefault();
  //           onToggle();
  //           router.push(EXPLORER.MAIN);
  //         }}
  //       />
  //     </>
  //   );
  // };

  return (
    <></>
    // <Drawer ref={ref}>
    //   <div className="flex w-full justify-between ">
    //     <Content />
    //   </div>
    // </Drawer>
  );
};
