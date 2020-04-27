function _classCallCheck(e,s){if(!(e instanceof s))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,s){for(var t=0;t<s.length;t++){var n=s[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,s,t){return s&&_defineProperties(e.prototype,s),t&&_defineProperties(e,t),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"Hpu/":function(e,s,t){"use strict";t.r(s),t.d(s,"BatchAssignerComponent",(function(){return J})),t.d(s,"BatchAssignerModule",(function(){return A}));var n,i=t("ofXK"),r=t("3Pt+"),a=t("Kj3r"),c=t("fXoL"),o=t("8z58"),b=t("YMqD"),u=t("pLZG"),l=t("lJxs"),f=t("/uUt"),d=t("kgdF"),v=t("wi0a"),p=t("YVN/"),k=((n=function(){function e(s,t,n){_classCallCheck(this,e),this.lotteryStore=s,this.lotteryService=t,this.lotteriesQuery=n,this.activeTasks$=this.lotteriesQuery.selectActive().pipe(Object(u.a)((function(e){return void 0!==e})),Object(l.a)((function(e){return Object(b.c)(e.assignedTasks)})),Object(f.a)()),this.assignedTasks$=this.lotteriesQuery.selectActive().pipe(Object(u.a)((function(e){return void 0!==e})),Object(l.a)((function(e){var s=[];for(var t in e.assignedTasks)s.push({name:t,assignees:e.assignedTasks[t]});return s})),Object(f.a)())}return _createClass(e,[{key:"updateTasks",value:function(e){var s=Object(b.b)(e),t=this.lotteriesQuery.getActive();if(s.length>0&&t){var n;for(var i in n=t.assignedTasks?JSON.parse(JSON.stringify(t.assignedTasks)):new d.a)s.includes(i)||delete n[i];s.forEach((function(e){n[e]||(n[e]=[])})),this.lotteryStore.updateActive({assignedTasks:n})}}},{key:"assignTasks",value:function(e){var s=Number(e),t=this.lotteriesQuery.getActive();if(t){for(var n=t.participants.length,i=JSON.parse(JSON.stringify(t.assignedTasks)),r=0;r<n;r++){var a=void 0,c=[];for(var o in i){var b=i[o].length;if(!(b>=s)){var u=-b;a||(a=this.lotteryService.pickAWinner(!1)),i[o].includes(a)||u++,c.push({name:o,points:u})}}c.sort((function(e,s){return s.points-e.points})),c[0]&&i[c[0].name].push(a)}this.lotteryStore.updateActive({assignedTasks:i})}}},{key:"resetAssignments",value:function(){var e=this.lotteriesQuery.getActive();if(e){var s=JSON.parse(JSON.stringify(e.assignedTasks));for(var t in s)s[t]=[];this.lotteryStore.updateActive({assignedTasks:s})}}}]),e}()).\u0275fac=function(e){return new(e||n)(c.Sb(v.a),c.Sb(o.a),c.Sb(p.a))},n.\u0275prov=c.Ab({token:n,factory:n.\u0275fac,providedIn:"root"}),n);function g(e,s){if(1&e&&(c.Kb(0,"div"),c.sc(1),c.Jb()),2&e){var t=s.$implicit;c.rb(1),c.uc("- [ ] ",t,"")}}function m(e,s){if(1&e&&(c.Kb(0,"div"),c.sc(1),c.qc(2,g,2,1,"div",13),c.sc(3,"\n"),c.Jb()),2&e){var t=s.$implicit;c.rb(1),c.uc("## ",t.name,"\n\n"),c.rb(1),c.dc("ngForOf",t.assignees)}}var h,y,J=((y=function(){function e(s,t,n){_classCallCheck(this,e),this.formBuilder=s,this.lotteryService=t,this.batchAssignerService=n,this.taskForm=this.formBuilder.group({tasks:["",{updateOn:"blur"}]})}return _createClass(e,[{key:"ngOnInit",value:function(){var e=this;this.batchAssignerService.activeTasks$.subscribe((function(s){e.taskForm.patchValue({tasks:s})})),this.taskForm.controls.tasks.valueChanges.pipe(Object(a.a)(100)).subscribe((function(s){e.batchAssignerService.updateTasks(s)}))}}]),e}()).\u0275fac=function(e){return new(e||y)(c.Eb(r.b),c.Eb(o.a),c.Eb(k))},y.\u0275cmp=c.yb({type:y,selectors:[["app-batch-assigner"]],decls:32,vars:13,consts:[[1,"row","mt-1",3,"formGroup"],[1,"col-sm-6"],[1,"form-group"],["for","tasks"],["formControlName","tasks","id","tasks","rows","5",1,"form-control"],[1,"form-text","text-muted"],["type","button",1,"btn","btn-outline-secondary","mr-1",3,"click"],[1,"mr-1"],["for","maxAssignmentsPerTask",1,"sr-only"],["type","text","id","maxAssignmentsPerTask","value","1","type","number",1,"form-control","form-control-inline","mr-1"],["maxAssignmentsPerTask",""],["for","assignedTasks"],["contenteditable","true",1,"result","mb-2"],[4,"ngFor","ngForOf"],["type","button",1,"btn","btn-outline-secondary","mr-2",3,"click"]],template:function(e,s){if(1&e){var t=c.Lb();c.Kb(0,"div",0),c.Kb(1,"div",1),c.Kb(2,"div",2),c.Kb(3,"label",3),c.sc(4,"Tasks"),c.Jb(),c.Fb(5,"textarea",4),c.Zb(6,"async"),c.Kb(7,"small",5),c.sc(8,"Enter the tasks as a comma or new line separated list"),c.Jb(),c.Jb(),c.Kb(9,"button",6),c.Wb("click",(function(){c.lc(t);var e=c.kc(17);return s.batchAssignerService.assignTasks(e.value)})),c.Zb(10,"async"),c.sc(11," Assign "),c.Jb(),c.Kb(12,"span",7),c.sc(13,"maximum"),c.Jb(),c.Kb(14,"label",8),c.sc(15,"Maximum assignments per task"),c.Jb(),c.Fb(16,"input",9,10),c.Kb(18,"span"),c.sc(19,"per task"),c.Jb(),c.Jb(),c.Kb(20,"div",1),c.Kb(21,"div",2),c.Kb(22,"label",11),c.sc(23,"Assigned Tasks"),c.Jb(),c.Kb(24,"div",12),c.Kb(25,"pre"),c.Kb(26,"code"),c.qc(27,m,4,2,"div",13),c.Zb(28,"async"),c.Jb(),c.Jb(),c.Jb(),c.Kb(29,"button",14),c.Wb("click",(function(){return s.batchAssignerService.resetAssignments()})),c.Zb(30,"async"),c.sc(31," Reset "),c.Jb(),c.Jb(),c.Jb(),c.Jb()}2&e&&(c.dc("formGroup",s.taskForm),c.rb(5),c.sb("disabled",c.ac(6,5,s.lotteryService.activeID$)?null:""),c.rb(4),c.sb("disabled",c.ac(10,7,s.lotteryService.activeID$)?null:""),c.rb(18),c.dc("ngForOf",c.ac(28,9,s.batchAssignerService.assignedTasks$)),c.rb(2),c.sb("disabled",c.ac(30,11,s.lotteryService.activeID$)?null:""))},directives:[r.i,r.d,r.a,r.h,r.c,i.e],pipes:[i.a],styles:[".form-control-inline[_ngcontent-%COMP%]{width:62px;display:inline}.result[_ngcontent-%COMP%]{border:1px solid #ced4da}"]}),y),A=((h=function e(){_classCallCheck(this,e)}).\u0275mod=c.Cb({type:h}),h.\u0275inj=c.Bb({factory:function(e){return new(e||h)},imports:[[i.b,r.k]]}),h)}}]);