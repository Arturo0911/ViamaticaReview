import { Appartment } from "../entity/appartment.entity";
import { Request, Response } from "express";
import { ApparmentBody } from "../interfaces/IAppartment";
import jwt from 'jsonwebtoken';

export const getAppartments  = async (req: Request, res: Response) => {

    if (req.header('auth-token')) {
        try {
            const token:string | any = req.header('auth-token');
            const payload = jwt.verify(token, process.env["SECRET_KEY"] || '')
            console.log("this is the payload: ", payload);
            
            const appartment = await Appartment.find();
            return res.status(200).json(appartment);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message });
            }
        }
    } else{
        res.status(403).json({message: "you don't have access"})
    }
};


export const getAppartment  = async (req: Request, res: Response) => {

    if(req.header('auth-token')){
        try {
            const { id } = req.params;
            const appartment = await Appartment.findOneBy({ appartmentId: parseInt(id) });
    
            if (!appartment) return res.status(404).json({ message: "appartment not found" });
    
            return res.status(200).json(appartment)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message });
            }
        }
    }else{
        res.status(403).json({message: "you don't have access"})
    }
};

export const newAppartment = async (req: Request<unknown, unknown, ApparmentBody>, res: Response) => {

    if (req.header('auth-token')) {
        try {
            const appartmentBody = req.body;
            const appartmentSaved = await Appartment.save(appartmentBody);

            res.status(200).json({ message: "appartment saved", appartment: appartmentSaved })

        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message });
            }
        }
    } else {
        res.status(401).json({ message: "your not authorized to see this place" })
    }
}


export const udpateAppartment = async(req: Request, res:Response) =>{
    if(req.header('auth-token')){
        try {
            const { id } = req.params;
            const appartment = await Appartment.findOneBy({ appartmentId: parseInt(id) });
    
            if (!appartment) return res.status(404).json({ message: "appartment not found" });
            await Appartment.update({appartmentId: parseInt(id)}, req.body);
            return res.status(204).json({message: "appartment updated successfully"})
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message });
            }
        }
    }else{
        res.status(403).json({message: "you don't have access"})
    }
}

export const deleteAppartment = async(req: Request, res:Response) => {
    if(req.header('auth-token')){
        try {
            const { id } = req.params;
            const appartment = await Appartment.findOneBy({ appartmentId: parseInt(id) });
    
            if (!appartment) return res.status(404).json({ message: "client not found" });

            appartment.status = false;
            await Appartment.update({appartmentId: parseInt(id)}, appartment);
            return res.status(204).json({message: "appartment deleted successfully"})
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message });
            }
        }
    }else{
        res.status(403).json({message: "you don't have access"})
    }
}
