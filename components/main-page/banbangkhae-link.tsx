import { WebLink } from "@/components/common/weblink";
import { ArrowLeft } from "lucide-react";

export function BanBangkhaeLink() {
    return (
        <div className="flex items-center gap-2 fixed top-4 left-4 md:top-20 md:left-20 z-50">
            <ArrowLeft width={20} height={20} />
            <WebLink href="https://banbangkhae.dop.go.th" target="_self" rel="noopener noreferrer" className="text-black font-prompt">
                เข้าสู่เว็บไซต์ <span className="font-bold">บ้านบางแค</span>
            </WebLink>
        </div>
    );
}
