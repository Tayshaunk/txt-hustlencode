import { UpdateHustlencodePostDto } from "dtos/hustlencode-post.dto";
import { ICode } from "./post.interface";

export interface IServerErrorRespone {
  message: string;
}

export interface IServerResponse {
  payload?: any;
  message: string;
}

export interface IUsePostPreview{
  value: ICode;
  isLoading: boolean;
  isSaving: boolean;
  hasChanges: boolean;
  setHasChanges: (b:boolean) => void;
  updatePreview:(c:ICode) => void;
  setValue: (c:ICode) => void;
  saveChanges:(postId: string, payload: UpdateHustlencodePostDto) => void;
  saveAndExit: (postId: string, payload: UpdateHustlencodePostDto) => void;
}