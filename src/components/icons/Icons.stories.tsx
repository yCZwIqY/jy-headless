import {Meta, StoryObj} from "@storybook/react";
import CloseIcon from "./CloseIcon.tsx";
import UserIcon from "./UserIcon.tsx";
import HomeIcon from "./HomeIcon.tsx";
import SearchIcon from "./SearchIcon.tsx";
import GearIcon from "./GearIcon.tsx";
import BellIcon from "./BellIcon.tsx";
import SettingIcon from "./SettingIcon.tsx";
import GlobeIcon from "./GlobeIcon.tsx";
import LockIcon from "./LockIcon.tsx";
import UnLockIcon from "./UnLockIcon.tsx";
import HeartIcon from "./HeartIcon.tsx";
import StarIcon from "./StarIcon.tsx";
import MinusIcon from "./MinusIcon.tsx";
import PlusIcon from "./PlusIcon.tsx";
import DownloadIcon from "./DownloadIcon.tsx";
import UploadIcon from "./UploadIcon.tsx";
import CloudIcon from "./CloudIcon.tsx";
import RefreshIcon from "./RefreshIcon.tsx";
import EditdIcon from "./EditIcon.tsx";
import SaveIcon from "./SaveIcon.tsx";
import CartIcon from "./CartIcon.tsx";
import AddCartIcon from "./AddCartIcon.tsx";
import RemoveCartIcon from "./RemoveCartIcon.tsx";
import CreditCardIcon from "./CreditCardIcon.tsx";
import FileIcon from "./FileIcon.tsx";
import FolderIcon from "./FolderIcon.tsx";
import CameraIcon from "./CameraIcon.tsx";
import VideoIcon from "./VideoIcon.tsx";
import {ReactNode} from "react";

const meta: Meta = {
    title: "Icons",
    component: HeartIcon,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        color: {control: 'text'},
        size: {control: 'text'},
        width: {control: 'text'},
        height: {control: 'text'},
        fill: {control: 'text'},
    },
    args: {
        color: 'black',
        size: '30px',
        width: '',
        height: '',
        fill: ''
    }
} as StoryObj;

export default meta;
type Story = StoryObj;

const IconMaper = ({icon, name}: { icon: ReactNode, name: string }) =>
    <div className={'w-[50px] flex flex-col items-center text-center'}>
        {icon}
        <span>{name}</span>
    </div>


export const Example = {
    args: {
        color: 'none',
        size: '30px',
        width: '',
        height: '',
        fill: 'red'
    }
}
export const Icons: Story = {
    render: () => <div className={'mx-12 flex flex-wrap gap-6'}>
        <IconMaper icon={<HomeIcon color={'black'} size={'30px'}/>} name={'home'}/>
        <IconMaper icon={<SearchIcon color={'black'} size={'30px'}/>} name={'search'}/>
        <IconMaper icon={<UserIcon color={'black'} size={'30px'}/>} name={'user'}/>
        <IconMaper icon={<GearIcon color={'black'} size={'30px'}/>} name={'gear'}/>
        <IconMaper icon={<SettingIcon color={'black'} size={'30px'}/>} name={'setting'}/>
        <IconMaper icon={<BellIcon color={'black'} size={'30px'}/>} name={'bell'}/>
        <IconMaper icon={<GlobeIcon color={'black'} size={'30px'}/>} name={'globe'}/>
        <IconMaper icon={<LockIcon color={'black'} size={'30px'}/>} name={'lock'}/>
        <IconMaper icon={<UnLockIcon color={'black'} size={'30px'}/>} name={'unLock'}/>
        <IconMaper icon={<HeartIcon color={'black'} size={'30px'}/>} name={'heart'}/>
        <IconMaper icon={<StarIcon color={'black'} size={'30px'}/>} name={'star'}/>
        <IconMaper icon={<MinusIcon color={'black'} size={'30px'}/>} name={'minus'}/>
        <IconMaper icon={<PlusIcon color={'black'} size={'30px'}/>} name={'plus'}/>
        <IconMaper icon={<DownloadIcon color={'black'} size={'30px'}/>} name={'download'}/>
        <IconMaper icon={<UploadIcon color={'black'} size={'30px'}/>} name={'upload'}/>
        <IconMaper icon={<CloudIcon color={'black'} size={'30px'}/>} name={'cloud'}/>
        <IconMaper icon={<RefreshIcon color={'black'} size={'30px'}/>} name={'refresh'}/>
        <IconMaper icon={<EditdIcon color={'black'} size={'30px'}/>} name={'edit'}/>
        <IconMaper icon={<SaveIcon color={'black'} size={'30px'}/>} name={'save'}/>
        <IconMaper icon={<CartIcon color={'black'} size={'30px'}/>} name={'cart'}/>
        <IconMaper icon={<AddCartIcon color={'black'} size={'30px'}/>} name={'add cart'}/>
        <IconMaper icon={<RemoveCartIcon color={'black'} size={'30px'}/>} name={'remove cart'}/>
        <IconMaper icon={<CreditCardIcon color={'black'} size={'30px'}/>} name={'credit card'}/>
        <IconMaper icon={<FileIcon color={'black'} size={'30px'}/>} name={'file'}/>
        <IconMaper icon={<FolderIcon color={'black'} size={'30px'}/>} name={'folder'}/>
        <IconMaper icon={<CameraIcon color={'black'} size={'30px'}/>} name={'camera'}/>
        <IconMaper icon={<VideoIcon color={'black'} size={'30px'}/>} name={'video'}/>
        <IconMaper icon={<CloseIcon color={'black'} size={'30px'}/>} name={'close'}/>
    </div>
};
